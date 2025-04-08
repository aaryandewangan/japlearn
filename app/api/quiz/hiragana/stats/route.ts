import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get overall statistics
    const overallStats = await sql`
      SELECT 
        COUNT(*) as total_quizzes,
        ROUND(AVG(percentage)::numeric, 2) as average_score,
        COUNT(CASE WHEN passed THEN 1 END) as quizzes_passed,
        MAX(score) as highest_score
      FROM hiragana_quiz_results 
      WHERE user_id = ${(session.user as any).id}
    `;

    // Get statistics by difficulty
    const difficultyStats = await sql`
      SELECT 
        difficulty,
        COUNT(*) as attempts,
        ROUND(AVG(percentage)::numeric, 2) as average_score,
        COUNT(CASE WHEN passed THEN 1 END) as passed_count
      FROM hiragana_quiz_results 
      WHERE user_id = ${(session.user as any).id}
      GROUP BY difficulty
    `;

    // Get recent quiz history
    const recentQuizzes = await sql`
      SELECT 
        difficulty,
        score,
        total_questions,
        percentage,
        passed,
        timestamp
      FROM hiragana_quiz_results 
      WHERE user_id = ${(session.user as any).id}
      ORDER BY timestamp DESC 
      LIMIT 5
    `;

    return NextResponse.json({
      overall: overallStats.rows[0],
      byDifficulty: difficultyStats.rows,
      recent: recentQuizzes.rows
    });
  } catch (error) {
    console.error('Error fetching quiz statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 