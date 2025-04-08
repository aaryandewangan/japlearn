import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { deleteNote } from '@/lib/db';
import { authOptions } from '@/lib/auth-options';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await deleteNote(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
} 