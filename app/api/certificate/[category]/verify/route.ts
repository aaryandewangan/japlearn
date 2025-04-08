import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];
const PASSING_SCORE = 80;
const VALID_CATEGORIES = ['hiragana', 'katakana'];

export async function GET(request: Request) {
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

    const userId = (session.user as any).id;

    // Using a safer way to construct the query
    const query = `
      SELECT 
        difficulty::text,
        MAX(percentage)::float as best_score
      FROM ${category}_quiz_results
      WHERE user_id = $1
      GROUP BY difficulty
      ORDER BY difficulty;
    `;

    try {
      const verification = await sql.query(query, [userId]);

      // Check if we have passing scores for all difficulties
      const scores = verification.rows;
      const passedDifficulties = scores.filter(row => row.best_score >= PASSING_SCORE);
      const verified = passedDifficulties.length === VALID_DIFFICULTIES.length;

      console.log('Verification check:', {
        category,
        scores,
        passedCount: passedDifficulties.length,
        requiredCount: VALID_DIFFICULTIES.length,
        verified
      });

      return NextResponse.json({ 
        verified,
        details: {
          scores,
          passedCount: passedDifficulties.length,
          requiredCount: VALID_DIFFICULTIES.length
        }
      });
    } catch (dbError: any) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Database error', details: dbError.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error verifying certificate:', error);
    return NextResponse.json(
      { error: 'Failed to verify certificate', details: error.message },
      { status: 500 }
    );
  }
} 