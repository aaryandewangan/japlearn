import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('API Session:', session);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const isAdmin = session?.user?.email === 'admin@japlearn.com' || 
                   (session?.user as any)?.is_admin;

    if (!isAdmin) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
    }

    // Query users with their note counts from the Neon database
    const usersResult = await sql`
      SELECT 
        id,
        email,
        name,
        is_admin,
        created_at,
        COALESCE(updated_at, created_at) as last_active,
        0 as note_count  -- Temporary hardcoded value
      FROM users
      ORDER BY created_at DESC;
    `;

    console.log('Query result:', usersResult.rows);

    const users = usersResult.rows.map(user => ({
      id: user.id,
      email: user.email,
      name: user.name || '',
      notesCount: parseInt(user.note_count) || 0,
      lastActive: user.last_active || new Date().toISOString(),
      is_admin: Boolean(user.is_admin)
    }));

    return NextResponse.json(users);
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch users', 
      details: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
} 