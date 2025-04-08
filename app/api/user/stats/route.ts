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
        created_at as joined_date,
        COALESCE(streak, 0) as streak,
        COALESCE(xp, 0) as total_xp,
        COALESCE(lessons_completed, 0) as lessons_completed,
        COALESCE(last_login, NOW()) as last_login
      FROM users 
      WHERE id = ${(token as any).id}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      stats: {
        joinedDate: result.rows[0].joined_date.toISOString(),
        lastLogin: result.rows[0].last_login.toISOString(),
        streak: result.rows[0].streak,
        totalXP: result.rows[0].total_xp,
        lessonsCompleted: result.rows[0].lessons_completed
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
} 