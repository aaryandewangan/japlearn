import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { deleteNote } from '@/lib/db';
import { authOptions } from '@/lib/auth-options';

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const noteId = request.url.split('/').pop();
    if (!noteId) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 });
    }

    await deleteNote(noteId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
} 