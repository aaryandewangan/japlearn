import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { sql } from '@vercel/postgres';
import { authOptions } from '@/app/lib/auth';

// Define valid quiz categories
const VALID_QUIZ_CATEGORIES = ['hiragana', 'katakana', 'kanji'] as const;
type QuizCategory = typeof VALID_QUIZ_CATEGORIES[number];

function isValidCategory(category: string): category is QuizCategory {
  return VALID_QUIZ_CATEGORIES.includes(category as QuizCategory);
}

const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
type Difficulty = typeof VALID_DIFFICULTIES[number];

function isValidDifficulty(difficulty: string): difficulty is Difficulty {
  return VALID_DIFFICULTIES.includes(difficulty as Difficulty);
}

async function deleteOldQuizzes(userId: string, tableName: string) {
  // Keep only the latest 10 quiz results per user
  await sql`
    DELETE FROM ${tableName} 
    WHERE user_id = ${userId} 
    AND id NOT IN (
      SELECT id 
      FROM ${tableName} 
      WHERE user_id = ${userId} 
      ORDER BY timestamp DESC 
      LIMIT 10
    )
  `;
}

export async function POST(request: Request) {
  try {
    const category = request.url.split('/').slice(-2)[0].toLowerCase();
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Validate category
    if (!isValidCategory(category)) {
      return NextResponse.json(
        { error: 'Invalid quiz category' },
        { status: 400 }
      );
    }

    const tableName = `${category}_quiz_results`;
    const userId = (session.user as any).id;

    const requestData = await request.json();
    console.log('Saving quiz result:', requestData); // Debug log

    const { 
      difficulty, 
      score, 
      totalQuestions, 
      answerHistory,
      passed,
      percentage,
      timestamp 
    } = requestData;

    // Validate difficulty
    if (!isValidDifficulty(difficulty)) {
      return NextResponse.json(
        { error: 'Invalid difficulty level' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (score === undefined || totalQuestions === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Save new quiz result
      await sql`
        INSERT INTO "${tableName}" (
          user_id,
          difficulty,
          score,
          total_questions,
          answer_history,
          passed,
          percentage,
          timestamp
        ) VALUES (
          ${userId},
          ${difficulty},
          ${score},
          ${totalQuestions},
          ${JSON.stringify(answerHistory)}::jsonb,
          ${passed},
          ${percentage},
          ${timestamp}
        )
      `;
    } catch (dbError) {
      console.error('Database error:', dbError); // Detailed DB error logging
      throw dbError;
    }

    // Delete old quizzes
    await deleteOldQuizzes(userId, tableName);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result', details: error.message },
      { status: 500 }
    );
  }
} 