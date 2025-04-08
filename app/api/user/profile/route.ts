import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function PATCH(request: Request) {
  try {
    const token = await getToken({ req: request as any });
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name } = await request.json();

    const result = await sql`
      UPDATE users 
      SET name = ${name}
      WHERE id = ${(token as any).id}
      RETURNING id, email, name;
    `;

    return NextResponse.json({
      success: true,
      user: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 