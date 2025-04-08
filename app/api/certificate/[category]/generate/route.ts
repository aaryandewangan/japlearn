import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

const VALID_CATEGORIES = ['hiragana', 'katakana'];

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const category = request.url.split('/').slice(-2)[0].toLowerCase();
    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category. Must be hiragana or katakana' },
        { status: 400 }
      );
    }

    const userName = session.user.name || 'Student';
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);

    return NextResponse.json({
      certificateData: {
        userName,
        category: displayCategory,
        date,
        title: `${displayCategory} Mastery Certificate`
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to generate certificate', details: error.message },
      { status: 500 }
    );
  }
}
