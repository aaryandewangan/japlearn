import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';

export async function PATCH(request: Request) {
  try {
    const userId = request.url.split('/').slice(-2)[0];
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const token = await getToken({ req: request as any });
    
    if (!(token as any)?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE id = ${userId}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
} 