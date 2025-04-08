'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import EditPasswordModal from '@/app/components/EditPasswordModal';
import { showToast } from '@/app/components/CustomToast';
import { ACHIEVEMENTS } from '@/app/lib/achievements';
import AchievementCard from '@/app/components/profile/AchievementCard';
import ProgressChart from '@/app/components/profile/ProgressChart';
import { calculateLevel, calculateProgress, LEVELS } from '@/app/lib/levels';
import LevelProgress from '@/app/components/profile/LevelProgress';

interface UserStats {
  streak: number;
  totalXP: number;
  lessonsCompleted: number;
  joinedDate: string;
  achievements: string[];
  lastLogin: string;
  learningTime: number;
  currentLevel: number;
  accuracyRate: number;
  progressData: {
    dates: string[];
    xp: number[];
  };
}

function formatDate(dateString: string): string {
  if (!dateString) return 'Invalid Date';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch (error) {
    return 'Invalid Date';
  }
}

function formatRelativeTime(dateString: string): string {
  if (!dateString) return 'Never';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Never';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return formatDate(dateString);
    }
  } catch (error) {
    return 'Never';
  }
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    streak: 0,
    totalXP: 0,
    lessonsCompleted: 0,
    joinedDate: '',
    achievements: [],
    lastLogin: '',
    learningTime: 0,
    currentLevel: 1,
    accuracyRate: 0,
    progressData: {
      dates: [],
      xp: [],
    },
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('/api/user/stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    if (session?.user) {
      fetchUserStats();
    }
  }, [session]);

  const handleUpdatePassword = async (newPassword: string) => {
    try {
      const response = await fetch('/api/user/password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        showToast.success('Password updated successfully');
        setIsEditingPassword(false);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      showToast.error('Failed to update password');
      throw err;
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:col-span-2"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Profile
            </h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {session?.user?.name || 'Not set'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {session?.user?.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Member Since
                </label>
                <p className="mt-1 text-lg text-gray-900 dark:text-white">
                  {formatDate(stats.joinedDate)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setIsEditingPassword(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Statistics
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Current Streak
                </label>
                <p className="mt-1 text-3xl font-bold text-orange-500">
                  {stats.streak} days
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total XP
                </label>
                <p className="mt-1 text-3xl font-bold text-yellow-500">
                  {stats.totalXP} XP
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                  Lessons Completed
                </label>
                <p className="mt-1 text-3xl font-bold text-green-500">
                  {stats.lessonsCompleted}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress Chart */}
          <motion.div className="md:col-span-3">
            <ProgressChart data={stats.progressData} />
          </motion.div>

          {/* Level Progress */}
          <motion.div className="md:col-span-3 mb-6">
            <LevelProgress
              currentLevel={calculateLevel(stats.totalXP)}
              progress={calculateProgress(stats.totalXP)}
              nextLevel={LEVELS[calculateLevel(stats.totalXP).level]}
            />
          </motion.div>

          {/* Achievements */}
          <motion.div className="md:col-span-3">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Achievements
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {ACHIEVEMENTS.map(achievement => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={stats.achievements.includes(achievement.id)}
                />
              ))}
            </div>
          </motion.div>

          {/* Additional Stats */}
          <motion.div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Current Level
              </h3>
              <p className="mt-1 text-2xl font-bold text-indigo-600">
                Level {stats.currentLevel}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Accuracy Rate
              </h3>
              <p className="mt-1 text-2xl font-bold text-blue-600">
                {stats.accuracyRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Learning Time
              </h3>
              <p className="mt-1 text-2xl font-bold text-purple-600">
                {Math.floor(stats.learningTime / 60)}h {stats.learningTime % 60}m
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Last Session
              </h3>
              <p className="mt-1 text-2xl font-bold text-teal-600">
                {formatRelativeTime(stats.lastLogin)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatDate(stats.lastLogin)}
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <EditPasswordModal
        isOpen={isEditingPassword}
        onClose={() => setIsEditingPassword(false)}
        onSubmit={handleUpdatePassword}
        userEmail={session?.user?.email || ''}
      />
    </div>
  );
} 