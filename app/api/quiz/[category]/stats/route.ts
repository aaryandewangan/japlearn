import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

// Add this function to delete old quizzes
const deleteOldQuizzes = async (userId: string, tableName: string) => {
  await sql`
    WITH RankedQuizzes AS (
      SELECT id,
             ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY timestamp DESC) as rn
      FROM ${sql(tableName)}
      WHERE user_id = ${userId}
    )
    DELETE FROM ${sql(tableName)}
    WHERE id IN (
      SELECT id 
      FROM RankedQuizzes 
      WHERE rn > 5
    );
  `;
};

export async function GET(request: Request) {
  try {
    const category = request.url.split('/').slice(-2)[0].toLowerCase();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const tableName = `${category}_quiz_results`;
    const userId = (session.user as any).id;

    // Delete old quizzes first
    await deleteOldQuizzes(userId, tableName);

    // Get overall statistics
    const overallStats = await sql`
      SELECT 
        COUNT(*) as total_quizzes,
        ROUND(AVG(percentage)::numeric, 2) as average_score,
        COUNT(CASE WHEN passed THEN 1 END) as quizzes_passed,
        MAX(percentage) as highest_score
      FROM ${sql(tableName)}
      WHERE user_id = ${userId}
    `;

    // Get statistics by difficulty
    const difficultyStats = await sql`
      SELECT 
        difficulty,
        COUNT(*) as attempts,
        ROUND(AVG(percentage)::numeric, 2) as average_score,
        COUNT(CASE WHEN passed THEN 1 END) as passed_count
      FROM ${sql(tableName)}
      WHERE user_id = ${userId}
      GROUP BY difficulty
    `;

    // Get recent quiz history (only 5 most recent)
    const recentQuizzes = await sql`
      SELECT 
        difficulty,
        score,
        total_questions,
        percentage,
        passed,
        timestamp
      FROM ${sql(tableName)}
      WHERE user_id = ${userId}
      ORDER BY timestamp DESC 
      LIMIT 5
    `;

    return NextResponse.json({
      overall: overallStats.rows[0] || {
        total_quizzes: 0,
        average_score: 0,
        quizzes_passed: 0,
        highest_score: 0
      },
      byDifficulty: difficultyStats.rows || [],
      recent: recentQuizzes.rows || []
    });
  } catch (error) {
    console.error('Error fetching quiz statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 