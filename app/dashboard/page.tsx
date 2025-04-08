'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '@/app/components/layout/Header';
import { FiAward, FiTrendingUp, FiCheck, FiX, FiList, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface CategoryStats {
  hiragana?: QuizStats;
  katakana?: QuizStats;
}

interface QuizStats {
  overall: {
    total_quizzes: number;
    average_score: number;
    quizzes_passed: number;
    highest_score: number;
  };
  byDifficulty: {
    difficulty: string;
    attempts: number;
    average_score: number;
    passed_count: number;
  }[];
  recent: {
    difficulty: string;
    score: number;
    total_questions: number;
    percentage: number;
    passed: boolean;
    timestamp: string;
  }[];
}

// Add TypeScript interfaces for component props
interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

interface DifficultyProgressProps {
  stats: {
    difficulty: string;
    attempts: number;
    average_score: number;
    passed_count: number;
  }[];
}

interface RecentQuizzesProps {
  quizzes: {
    difficulty: string;
    score: number;
    total_questions: number;
    percentage: number;
    passed: boolean;
    timestamp: string;
  }[];
}

// Add new interface for certificate requirements
interface CertificateRequirements {
  easy: boolean;
  medium: boolean;
  hard: boolean;
}

// Add Certificate component
const Certificate: React.FC<{
  category: string;
  requirements: CertificateRequirements;
}> = ({ category, requirements }) => {
  const allCompleted = requirements.easy && requirements.medium && requirements.hard;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {category} Certificate
      </h2>
      
      {allCompleted ? (
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full 
              flex items-center justify-center mx-auto">
              <FiAward className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Certificate Unlocked! 🎉
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Congratulations! You've mastered all difficulty levels.
          </p>
          <button
            onClick={() => window.open(`/certificate/${category.toLowerCase()}`, '_blank')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 
              transition-colors font-medium"
          >
            View Certificate
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Easy Level</span>
              {requirements.easy ? (
                <FiCheck className="w-5 h-5 text-green-500" />
              ) : (
                <FiLock className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Medium Level</span>
              {requirements.medium ? (
                <FiCheck className="w-5 h-5 text-green-500" />
              ) : (
                <FiLock className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Hard Level</span>
              {requirements.hard ? (
                <FiCheck className="w-5 h-5 text-green-500" />
              ) : (
                <FiLock className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Complete all difficulty levels with at least 80% score to unlock your certificate.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState<'hiragana' | 'katakana'>('hiragana');
  const [stats, setStats] = useState<CategoryStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/quiz/${selectedCategory}/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(prev => ({
            ...prev,
            [selectedCategory]: data
          } as CategoryStats));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchStats();
    }
  }, [session, selectedCategory]);

  // Add this useEffect to handle URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category === 'katakana' || category === 'hiragana') {
      setSelectedCategory(category);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!stats?.[selectedCategory]) {
    return <div>No data available</div>;
  }

  const currentStats = stats[selectedCategory];

  const getCertificateRequirements = (stats: any): CertificateRequirements => {
    const requirements = {
      easy: false,
      medium: false,
      hard: false
    };

    stats.byDifficulty.forEach((diff: any) => {
      if (diff.average_score >= 80) {
        requirements[diff.difficulty as keyof CertificateRequirements] = true;
      }
    });

    return requirements;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Selection */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg p-1 bg-gray-200 dark:bg-gray-800">
                <button
                  onClick={() => setSelectedCategory('hiragana')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${selectedCategory === 'hiragana'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  Hiragana
                </button>
                <button
                  onClick={() => setSelectedCategory('katakana')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${selectedCategory === 'katakana'
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                  Katakana
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard
                title="Total Quizzes"
                value={currentStats.overall.total_quizzes}
                icon={<FiAward />}
                color="blue"
              />
              <StatsCard
                title="Average Score"
                value={`${currentStats.overall.average_score}%`}
                icon={<FiTrendingUp />}
                color="green"
              />
              <StatsCard
                title="Quizzes Passed"
                value={currentStats.overall.quizzes_passed}
                icon={<FiCheck />}
                color="purple"
              />
              <StatsCard
                title="Pass Rate"
                value={`${currentStats.overall.total_quizzes > 0 
                  ? Math.round((currentStats.overall.quizzes_passed / currentStats.overall.total_quizzes) * 100)
                  : 0}%`}
                icon={<FiAward />}
                color="yellow"
              />
            </div>

            {/* Detailed Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Progress by Difficulty */}
              <DifficultyProgress stats={currentStats.byDifficulty} />
              
              {/* Recent Quizzes */}
              <RecentQuizzes quizzes={currentStats.recent} />
            </div>

            {/* Certificate Section */}
            <div className="mt-8">
              <Certificate 
                category={selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                requirements={getCertificateRequirements(currentStats)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Update component definitions with proper types
const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  const bgColorClass = `bg-${color}-100 dark:bg-${color}-900/30`;
  const textColorClass = `text-${color}-500`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className={`${bgColorClass} p-3 rounded-lg`}>
          {React.cloneElement(icon as React.ReactElement<any>, { className: textColorClass })}
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};

const DifficultyProgress: React.FC<DifficultyProgressProps> = ({ stats }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Progress by Difficulty
    </h2>
    <div className="space-y-4">
      {stats.map((diff) => (
        <div key={diff.difficulty} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400 capitalize">
              {diff.difficulty}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {diff.average_score}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${diff.average_score}%` }}
            />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Passed {diff.passed_count} of {diff.attempts} attempts
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentQuizzes: React.FC<RecentQuizzesProps> = ({ quizzes }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      Recent Quizzes
    </h2>
    <div className="space-y-4">
      {quizzes.map((quiz, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 bg-gray-50 
            dark:bg-gray-700/50 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              quiz.passed
                ? 'bg-green-100 dark:bg-green-900/30'
                : 'bg-red-100 dark:bg-red-900/30'
            }`}>
              {quiz.passed ? (
                <FiCheck className="w-4 h-4 text-green-500" />
              ) : (
                <FiX className="w-4 h-4 text-red-500" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {quiz.difficulty}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Score: {quiz.score}/{quiz.total_questions}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {quiz.percentage}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(quiz.timestamp).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
); 