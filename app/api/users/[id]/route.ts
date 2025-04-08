import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(request: Request) {
  try {
    const userId = request.url.split('/').pop();
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const token = await getToken({ req: request as any });
    
    if (!(token as any)?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Prevent deleting the last admin
    const adminCount = await sql`
      SELECT COUNT(*) FROM users WHERE is_admin = true;
    `;

    const userToDelete = await sql`
      SELECT is_admin FROM users WHERE id = ${userId};
    `;

    if (userToDelete.rows[0]?.is_admin && adminCount.rows[0].count <= 1) {
      return NextResponse.json({ 
        error: 'Cannot delete the last admin user' 
      }, { 
        status: 400 
      });
    }

    // Delete the user
    const result = await sql`
      DELETE FROM users 
      WHERE id = ${userId}
      RETURNING id;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = request.url.split('/').pop();
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const token = await getToken({ req: request as any });
    
    if (!(token as any)?.is_admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { is_admin } = await request.json();

    // Prevent removing admin role from self
    if ((token as any).id === parseInt(userId) && !is_admin) {
      return NextResponse.json({ 
        error: 'Cannot remove admin role from yourself' 
      }, { 
        status: 400 
      });
    }

    // Update the user's admin status
    const result = await sql`
      UPDATE users 
      SET is_admin = ${is_admin}
      WHERE id = ${userId}
      RETURNING id, email, is_admin;
    `;
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const updatedUser = result.rows[0];
    
    return NextResponse.json({ 
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
} 