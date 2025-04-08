'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import { FiBook, FiBookOpen, FiAward, FiStar, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

type Difficulty = 'easy' | 'medium' | 'hard';
type QuizStatus = 'selecting' | 'ongoing' | 'completed';

interface Question {
  kana: string;
  correctAnswer: string;
  options: string[];
}

interface QuizResult {
  difficulty: Difficulty;
  score: number;
  totalQuestions: number;
  timestamp: Date;
}

// Add new interface for tracking answers
interface AnswerHistory {
  kana: string;
  correctAnswer: string;
  userAnswer: string;
  isCorrect: boolean;
}

const KatakanaQuiz: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('selecting');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);

  const generateQuestions = (difficulty: Difficulty) => {
    const questionCount = {
      easy: 10,
      medium: 15,
      hard: 20
    }[difficulty];

    const optionCount = 4;

    // Updated characters to Katakana
    const availableCharacters = {
      easy: [
        // Vowels
        { kana: 'ア', romaji: 'a' },
        { kana: 'イ', romaji: 'i' },
        { kana: 'ウ', romaji: 'u' },
        { kana: 'エ', romaji: 'e' },
        { kana: 'オ', romaji: 'o' },
        // K-group
        { kana: 'カ', romaji: 'ka' },
        { kana: 'キ', romaji: 'ki' },
        { kana: 'ク', romaji: 'ku' },
        { kana: 'ケ', romaji: 'ke' },
        { kana: 'コ', romaji: 'ko' },
        // S-group
        { kana: 'サ', romaji: 'sa' },
        { kana: 'シ', romaji: 'shi' },
        { kana: 'ス', romaji: 'su' },
        { kana: 'セ', romaji: 'se' },
        { kana: 'ソ', romaji: 'so' },
      ],
      medium: [
        // Include all easy characters plus:
        // T-group
        { kana: 'タ', romaji: 'ta' },
        { kana: 'チ', romaji: 'chi' },
        { kana: 'ツ', romaji: 'tsu' },
        { kana: 'テ', romaji: 'te' },
        { kana: 'ト', romaji: 'to' },
        // N-group
        { kana: 'ナ', romaji: 'na' },
        { kana: 'ニ', romaji: 'ni' },
        { kana: 'ヌ', romaji: 'nu' },
        { kana: 'ネ', romaji: 'ne' },
        { kana: 'ノ', romaji: 'no' },
        // H-group
        { kana: 'ハ', romaji: 'ha' },
        { kana: 'ヒ', romaji: 'hi' },
        { kana: 'フ', romaji: 'fu' },
        { kana: 'ヘ', romaji: 'he' },
        { kana: 'ホ', romaji: 'ho' },
        // M-group
        { kana: 'マ', romaji: 'ma' },
        { kana: 'ミ', romaji: 'mi' },
        { kana: 'ム', romaji: 'mu' },
        { kana: 'メ', romaji: 'me' },
        { kana: 'モ', romaji: 'mo' },
      ],
      hard: [
        // Include all medium characters plus:
        // Y-group
        { kana: 'ヤ', romaji: 'ya' },
        { kana: 'ユ', romaji: 'yu' },
        { kana: 'ヨ', romaji: 'yo' },
        // R-group
        { kana: 'ラ', romaji: 'ra' },
        { kana: 'リ', romaji: 'ri' },
        { kana: 'ル', romaji: 'ru' },
        { kana: 'レ', romaji: 're' },
        { kana: 'ロ', romaji: 'ro' },
        // W-group
        { kana: 'ワ', romaji: 'wa' },
        { kana: 'ヲ', romaji: 'wo' },
        // N
        { kana: 'ン', romaji: 'n' },
        // Dakuon (G-group)
        { kana: 'ガ', romaji: 'ga' },
        { kana: 'ギ', romaji: 'gi' },
        { kana: 'グ', romaji: 'gu' },
        { kana: 'ゲ', romaji: 'ge' },
        { kana: 'ゴ', romaji: 'go' },
        // Dakuon (Z-group)
        { kana: 'ザ', romaji: 'za' },
        { kana: 'ジ', romaji: 'ji' },
        { kana: 'ズ', romaji: 'zu' },
        { kana: 'ゼ', romaji: 'ze' },
        { kana: 'ゾ', romaji: 'zo' },
        // Common combinations
        { kana: 'キャ', romaji: 'kya' },
        { kana: 'キュ', romaji: 'kyu' },
        { kana: 'キョ', romaji: 'kyo' },
        { kana: 'シャ', romaji: 'sha' },
        { kana: 'シュ', romaji: 'shu' },
        { kana: 'ショ', romaji: 'sho' },
      ]
    }[difficulty];

    // Generate random questions
    const generatedQuestions: Question[] = [];
    for (let i = 0; i < questionCount; i++) {
      const correctCharacter = availableCharacters[Math.floor(Math.random() * availableCharacters.length)];
      const otherOptions = availableCharacters
        .filter(char => char.romaji !== correctCharacter.romaji)
        .sort(() => Math.random() - 0.5)
        .slice(0, optionCount - 1)
        .map(char => char.romaji);

      const allOptions = [...otherOptions, correctCharacter.romaji]
        .sort(() => Math.random() - 0.5);

      generatedQuestions.push({
        kana: correctCharacter.kana,
        correctAnswer: correctCharacter.romaji,
        options: allOptions
      });
    }

    return generatedQuestions;
  };

  const startQuiz = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setQuestions(generateQuestions(selectedDifficulty));
    setQuizStatus('ongoing');
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const checkAnswer = async () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) setScore(score + 1);
    setIsAnswerChecked(true);

    // Record answer history
    setAnswerHistory([
      ...answerHistory,
      {
        kana: questions[currentQuestionIndex].kana,
        correctAnswer: questions[currentQuestionIndex].correctAnswer,
        userAnswer: selectedAnswer,
        isCorrect: isCorrect
      }
    ]);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswerChecked(false);
      } else {
        setQuizStatus('completed');
        saveQuizResult();
      }
    }, 1000);
  };

  const saveQuizResult = async () => {
    if (!session?.user) return;

    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 80;

    try {
      const response = await fetch('/api/quiz/katakana/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          difficulty,
          score,
          totalQuestions: questions.length,
          answerHistory,
          passed,
          percentage,
          timestamp: new Date()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save quiz result');
      }
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  // Add function to get performance feedback
  const getPerformanceFeedback = () => {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 80;

    if (percentage === 100) {
      return {
        title: "Perfect Score! 🎉",
        message: "Outstanding! You've mastered this level!",
        suggestion: "Ready to take on a harder challenge?"
      };
    } else if (percentage >= 80) {
      return {
        title: "Great Job! 🌟",
        message: "You've passed with flying colors!",
        suggestion: "Review the ones you missed and try again for a perfect score!"
      };
    } else {
      return {
        title: "Keep Practicing! 💪",
        message: "You're making progress, but need more practice.",
        suggestion: "Focus on the characters you missed and try the quiz again."
      };
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {quizStatus === 'selecting' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Katakana Quiz
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Test your Katakana knowledge with our interactive quizzes
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Easy Level Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-br from-blue-500 to-blue-600">
                    <FiBook className="w-12 h-12 text-white mb-4" />
                    <h2 className="text-2xl font-bold text-white">Easy</h2>
                    <p className="text-blue-100 mt-2">Perfect for beginners</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <FiStar className="mr-2" /> 10 Questions
                      </li>
                      <li className="flex items-center">
                        <FiBookOpen className="mr-2" /> Basic Characters (ア-ソ)
                      </li>
                      <li className="flex items-center">
                        <FiClock className="mr-2" /> ~5 Minutes
                      </li>
                    </ul>
                    <button
                      onClick={() => startQuiz('easy')}
                      className="mt-6 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                        transition-colors font-medium"
                    >
                      Start Easy Quiz
                    </button>
                  </div>
                </motion.div>

                {/* Medium Level Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-br from-purple-500 to-purple-600">
                    <FiBookOpen className="w-12 h-12 text-white mb-4" />
                    <h2 className="text-2xl font-bold text-white">Medium</h2>
                    <p className="text-purple-100 mt-2">For intermediate learners</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <FiStar className="mr-2" /> 15 Questions
                      </li>
                      <li className="flex items-center">
                        <FiBookOpen className="mr-2" /> More Characters (ア-モ)
                      </li>
                      <li className="flex items-center">
                        <FiClock className="mr-2" /> ~10 Minutes
                      </li>
                    </ul>
                    <button
                      onClick={() => startQuiz('medium')}
                      className="mt-6 w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg 
                        transition-colors font-medium"
                    >
                      Start Medium Quiz
                    </button>
                  </div>
                </motion.div>

                {/* Hard Level Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 bg-gradient-to-br from-red-500 to-red-600">
                    <FiAward className="w-12 h-12 text-white mb-4" />
                    <h2 className="text-2xl font-bold text-white">Hard</h2>
                    <p className="text-red-100 mt-2">Challenge yourself</p>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <FiStar className="mr-2" /> 20 Questions
                      </li>
                      <li className="flex items-center">
                        <FiBookOpen className="mr-2" /> All Characters + Combinations
                      </li>
                      <li className="flex items-center">
                        <FiClock className="mr-2" /> ~15 Minutes
                      </li>
                    </ul>
                    <button
                      onClick={() => startQuiz('hard')}
                      className="mt-6 w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg 
                        transition-colors font-medium"
                    >
                      Start Hard Quiz
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {quizStatus === 'ongoing' && currentQuestionIndex < questions.length && (
            <div className="max-w-2xl mx-auto">
              {/* Progress without score */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-8 bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
              >
                <div className="text-center mb-8">
                  <div className="text-9xl mb-6 font-bold" style={{ color: '#1a1a1a' }}>
                    {questions[currentQuestionIndex].kana}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    What is the romaji for this character?
                  </div>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (!isAnswerChecked) {
                          const isCorrect = option === questions[currentQuestionIndex].correctAnswer;
                          if (isCorrect) setScore(score + 1);
                          
                          // Record answer history
                          setAnswerHistory([
                            ...answerHistory,
                            {
                              kana: questions[currentQuestionIndex].kana,
                              correctAnswer: questions[currentQuestionIndex].correctAnswer,
                              userAnswer: option,
                              isCorrect: isCorrect
                            }
                          ]);

                          // Immediately move to next question without showing feedback
                          if (currentQuestionIndex < questions.length - 1) {
                            setCurrentQuestionIndex(currentQuestionIndex + 1);
                          } else {
                            setQuizStatus('completed');
                            saveQuizResult();
                          }
                        }
                      }}
                      className="p-6 rounded-xl text-xl font-medium transition-all
                        bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                        hover:bg-gray-200 dark:hover:bg-gray-600"
                      disabled={isAnswerChecked}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {quizStatus === 'completed' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                {/* Result Header */}
                <div className="text-center mb-8">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-full" />
                    </div>
                    <FiAward className="w-16 h-16 mx-auto relative z-10 text-yellow-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {getPerformanceFeedback().title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">
                    {getPerformanceFeedback().message}
                  </p>
                </div>

                {/* Score Display */}
                <div className="flex justify-center items-center gap-8 mb-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-blue-500 dark:text-blue-400">
                      {Math.round((score / questions.length) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Final Score
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-bold text-green-500 dark:text-green-400">
                      {score}/{questions.length}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Correct Answers
                    </p>
                  </div>
                </div>

                {/* Answer Review */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Question Review
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {answerHistory.map((answer, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          answer.isCorrect
                            ? 'border-green-200 bg-green-50 dark:bg-green-900/10'
                            : 'border-red-200 bg-red-50 dark:bg-red-900/10'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>
                            {answer.kana}
                          </span>
                          <span className={`text-sm ${
                            answer.isCorrect
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {answer.isCorrect ? 'Correct' : 'Incorrect'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>Your answer: {answer.userAnswer}</p>
                          {!answer.isCorrect && (
                            <p>Correct answer: {answer.correctAnswer}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestion */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-8">
                  <p className="text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">Suggestion:</span> {getPerformanceFeedback().suggestion}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setQuizStatus('selecting')}
                    className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                      transition-colors font-medium"
                  >
                    Try Another Quiz
                  </button>
                  <button
                    onClick={() => router.push('/dashboard?category=katakana')}
                    className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 
                      dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 
                      transition-colors font-medium"
                  >
                    View Progress
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default KatakanaQuiz; 