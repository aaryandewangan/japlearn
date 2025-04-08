import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

export async function GET(request: Request) {
  try {
    const category = request.url.split('/').slice(-2)[0].toLowerCase();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const tableName = `${category}_quiz_results`;
    const userId = (session.user as any).id;

    const quizzes = await sql.query(`
      SELECT 
        difficulty,
        score,
        total_questions,
        percentage,
        passed,
        answer_history,
        timestamp
      FROM ${tableName}
      WHERE user_id = $1
      ORDER BY timestamp DESC
    `, [userId]);

    return NextResponse.json({
      quizzes: quizzes.rows
    });
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz history' },
      { status: 500 }
    );
  }
} 