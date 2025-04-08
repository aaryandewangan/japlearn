import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      SELECT 
        lesson_id,
        completed,
        score,
        last_attempt
      FROM lesson_progress 
      WHERE user_id = ${(token as any).id}
      ORDER BY last_attempt DESC;
    `;

    return NextResponse.json({
      success: true,
      lessonProgress: result.rows
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
} 