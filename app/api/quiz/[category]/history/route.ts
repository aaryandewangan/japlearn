import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const category = params.category;
    const tableName = `${category}_quiz_results`;

    const quizzes = await sql`
      SELECT 
        difficulty,
        score,
        total_questions,
        percentage,
        passed,
        answer_history,
        timestamp
      FROM ${sql(tableName)}
      WHERE user_id = ${(session.user as any).id}
      ORDER BY timestamp DESC
    `;

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