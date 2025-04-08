import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request) {
  try {
    const certificateId = request.url.split('/').pop();
    const result = await sql`
      SELECT 
        c.id,
        c.user_name,
        c.category,
        c.issued_date,
        c.verified
      FROM certificates c
      WHERE c.id = ${certificateId}
    `;

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Certificate not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ certificate: result.rows[0] });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to verify certificate', details: error.message },
      { status: 500 }
    );
  }
} 