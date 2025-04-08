'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface QuizProps {
  characters: Array<{
    kana: string;
    romaji: string;
  }>;
}

const QuizSystem: React.FC<QuizProps> = ({ characters }) => {
  const [questions, setQuestions] = useState<Array<{
    character: string;
    correctAnswer: string;
    options: string[];
  }>>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const generateQuestions = () => {
      const shuffled = [...characters].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, 5).map(char => ({
        character: char.kana,
        correctAnswer: char.romaji,
        options: generateOptions(char.romaji, characters.map(c => c.romaji))
      }));
    };

    setQuestions(generateQuestions());
  }, [characters]);

  const generateOptions = (correct: string, allAnswers: string[]) => {
    const options = [correct];
    const otherAnswers = allAnswers.filter(a => a !== correct);
    
    while (options.length < 4 && otherAnswers.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherAnswers.length);
      options.push(otherAnswers[randomIndex]);
      otherAnswers.splice(randomIndex, 1);
    }

    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    setTimeout(() => {
      if (answer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setQuestions(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (!questions.length) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {!showResult ? (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Score: {score}
            </div>
          </div>

          <div className="text-center">
            <motion.div 
              key={currentQuestion}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-9xl mb-12 font-japanese text-gray-900 dark:text-white"
            >
              {questions[currentQuestion].character}
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-4 rounded-xl text-lg font-medium transition-colors
                    ${selectedAnswer === null 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600' 
                      : selectedAnswer === option
                        ? option === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 border border-green-200 dark:border-green-800'
                          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 border border-red-200 dark:border-red-800'
                        : option === questions[currentQuestion].correctAnswer
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 border border-green-200 dark:border-green-800'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                    }
                    disabled:cursor-not-allowed
                  `}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Quiz Complete!
          </h3>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
            Your score: {score} / {questions.length}
          </p>
          <button
            onClick={restartQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default QuizSystem; 