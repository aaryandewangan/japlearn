import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Simpler update query
    await sql`
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = ${(token as any).id}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating last login:', error);
    return NextResponse.json(
      { error: 'Failed to update last login' },
      { status: 500 }
    );
  }
} 