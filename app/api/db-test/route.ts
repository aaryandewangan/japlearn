import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test connection
    const connectionTest = await sql`SELECT NOW();`;
    console.log('Connection test:', connectionTest.rows[0]);

    // Check if users table exists
    const tableTest = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `;
    console.log('Table test:', tableTest.rows[0]);

    // Get table structure
    const tableStructure = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users';
    `;
    console.log('Table structure:', tableStructure.rows);

    return NextResponse.json({
      success: true,
      connection: connectionTest.rows[0],
      tableExists: tableTest.rows[0].exists,
      structure: tableStructure.rows
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json({
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500
    });
  }
} 