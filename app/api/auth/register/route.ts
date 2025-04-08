import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with minimal fields first
    const result = await sql`
      INSERT INTO users (
        email, 
        password, 
        name, 
        created_at
      ) VALUES (
        ${email},
        ${hashedPassword},
        ${name},
        CURRENT_TIMESTAMP
      )
      RETURNING id, email, name, created_at as joined_date;
    `;

    return NextResponse.json({
      success: true,
      user: result.rows[0]
    });

  } catch (error: any) {
    // Log the specific error
    console.error('Registration error:', {
      message: error.message,
      code: error.code,
      detail: error.detail
    });

    // Check for specific error types
    if (error.code === '23505') { // Unique violation
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    if (error.code === '42P01') { // Undefined table
      return NextResponse.json(
        { error: 'Database setup required' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Registration failed: ' + error.message },
      { status: 500 }
    );
  }
} 