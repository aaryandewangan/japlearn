import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { lessonId, completed, score } = await request.json();

    // Update or insert lesson progress
    const result = await sql`
      INSERT INTO lesson_progress (
        user_id, 
        lesson_id, 
        completed, 
        score, 
        last_attempt
      ) VALUES (
        ${(token as any).id},
        ${lessonId},
        ${completed},
        ${score},
        NOW()
      )
      ON CONFLICT (user_id, lesson_id) 
      DO UPDATE SET 
        completed = EXCLUDED.completed,
        score = EXCLUDED.score,
        last_attempt = NOW()
      RETURNING *;
    `;

    // Update user stats
    await sql`
      UPDATE users 
      SET 
        lessons_completed = (
          SELECT COUNT(*) 
          FROM lesson_progress 
          WHERE user_id = ${(token as any).id} AND completed = true
        ),
        xp = xp + ${score}
      WHERE id = ${(token as any).id};
    `;

    return NextResponse.json({
      success: true,
      progress: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
} 