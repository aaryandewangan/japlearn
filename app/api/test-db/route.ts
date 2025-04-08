import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await sql`SELECT NOW();`;
    return NextResponse.json({ 
      success: true, 
      timestamp: result.rows[0].now 
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error.message 
    }, { 
      status: 500 
    });
  }
} 