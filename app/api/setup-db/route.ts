import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Drop the existing table
    await sql`DROP TABLE IF EXISTS users;`;
    
    // Create the users table with all required columns
    await sql`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    // Create an admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await sql`
      INSERT INTO users (email, password, is_admin)
      VALUES ('admin@japlearn.com', ${hashedPassword}, TRUE)
      ON CONFLICT (email) DO NOTHING;
    `;
    
    return NextResponse.json({ 
      success: true,
      message: 'Database and admin user setup completed successfully'
    });
  } catch (error) {
    console.error('Database setup error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Failed to setup admin',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    });
  }
} 