import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { 
      difficulty, 
      score, 
      totalQuestions, 
      answerHistory,
      passed,
      percentage,
      timestamp 
    } = await request.json();

    await sql`
      INSERT INTO katakana_quiz_results (
        user_id,
        difficulty,
        score,
        total_questions,
        answer_history,
        passed,
        percentage,
        timestamp
      ) VALUES (
        ${(session.user as any).id},
        ${difficulty},
        ${score},
        ${totalQuestions},
        ${JSON.stringify(answerHistory)}::jsonb,
        ${passed},
        ${percentage},
        ${timestamp}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result' },
      { status: 500 }
    );
  }
} 