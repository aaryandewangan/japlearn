import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

// Define types for the quiz result
interface QuizResult {
  difficulty: string;
  score: number;
  total_questions: number;
  percentage: number;
  passed: boolean;
  answer_history: any; // You might want to define a more specific type for this
  timestamp: string;
}

// Define types for the response
interface QuizHistoryResponse {
  quizzes: QuizResult[];
}

// Define valid quiz categories
const VALID_CATEGORIES = ['kanji', 'vocabulary', 'grammar'];

export async function GET(request: Request) {
  try {
    const category = request.url.split('/').slice(-2)[0].toLowerCase();
    
    // Validate category
    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid quiz category' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const tableName = `${category}_quiz_results`;
    const userId = (session.user as any).id;

    const quizzes = await sql.query(`
      SELECT 
        difficulty,
        score,
        total_questions,
        percentage,
        passed,
        answer_history,
        timestamp
      FROM ${tableName}
      WHERE user_id = $1
      ORDER BY timestamp DESC
    `, [userId]);

    return NextResponse.json<QuizHistoryResponse>({
      quizzes: quizzes.rows
    });
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quiz history' },
      { status: 500 }
    );
  }
} 