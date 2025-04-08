import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    await sql`
      UPDATE users 
      SET is_admin = true 
      WHERE email = ${email}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to update admin status:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 