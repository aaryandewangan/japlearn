import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const isAdmin = session?.user?.email === 'admin@japlearn.com' || 
                   (session?.user as any)?.is_admin;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Get today's date at midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch user statistics
    const totalUsersResult = await sql`SELECT COUNT(*) as count FROM users`;
    const activeUsersResult = await sql`
      SELECT COUNT(*) as count FROM users 
      WHERE updated_at >= ${today.toISOString()}
    `;
    const newUsersTodayResult = await sql`
      SELECT COUNT(*) as count FROM users 
      WHERE created_at >= ${today.toISOString()}
    `;

    // Fetch note statistics
    const totalNotesResult = await sql`SELECT COUNT(*) as count FROM notes`;
    const notesTodayResult = await sql`
      SELECT COUNT(*) as count FROM notes 
      WHERE created_at >= ${today.toISOString()}
    `;

    const totalUsers = parseInt(totalUsersResult.rows[0].count);
    const totalNotes = parseInt(totalNotesResult.rows[0].count);
    const averagePerUser = totalUsers > 0 ? totalNotes / totalUsers : 0;

    return NextResponse.json({
      userStats: {
        totalUsers,
        activeUsers: parseInt(activeUsersResult.rows[0].count),
        newUsersToday: parseInt(newUsersTodayResult.rows[0].count)
      },
      noteStats: {
        totalNotes,
        notesToday: parseInt(notesTodayResult.rows[0].count),
        averagePerUser
      }
    });
  } catch (error: any) {
    console.error('Failed to fetch admin stats:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error.message 
    }, { status: 500 });
  }
} 