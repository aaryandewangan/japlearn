'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import { FiUsers, FiFileText, FiTrendingUp, FiCheckSquare, FiHelpCircle } from 'react-icons/fi';

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
}

interface NoteStats {
  totalNotes: number;
  notesToday: number;
  averagePerUser: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0
  });
  const [noteStats, setNoteStats] = useState<NoteStats>({
    totalNotes: 0,
    notesToday: 0,
    averagePerUser: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    console.log('Full Session:', session);
    console.log('User:', session?.user);

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    // Check both is_admin flag and admin email
    const isAdmin = Boolean((session?.user as any)?.is_admin) || 
                   session?.user?.email === 'admin@japlearn.com';
    console.log('Is Admin?:', isAdmin);

    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }

    fetchStats();
  }, [status, session, router]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      setUserStats(data.userStats);
      setNoteStats(data.noteStats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* User Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Statistics</h2>
                <FiUsers className="text-blue-500" size={24} />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalUsers}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Active Today</p>
                  <p className="text-2xl font-bold text-green-500">{userStats.activeUsers}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">New Users Today</p>
                  <p className="text-2xl font-bold text-blue-500">{userStats.newUsersToday}</p>
                </div>
              </div>
            </div>

            {/* Note Stats Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Note Statistics</h2>
                <FiFileText className="text-green-500" size={24} />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Notes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{noteStats.totalNotes}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Notes Created Today</p>
                  <p className="text-2xl font-bold text-green-500">{noteStats.notesToday}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Average per User</p>
                  <p className="text-2xl font-bold text-blue-500">{noteStats.averagePerUser.toFixed(1)}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                <FiTrendingUp className="text-purple-500" size={24} />
              </div>
              <div className="space-y-4">
                <button
                  onClick={() => router.push('/admin')}
                  className="w-full px-4 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiUsers size={18} />
                  <span>Manage Users</span>
                </button>
                <button
                  onClick={() => router.push('/admin/test-papers')}
                  className="w-full px-4 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiFileText size={18} />
                  <span>Manage Test Papers</span>
                </button>
                <button
                  onClick={() => router.push('/admin/questions')}
                  className="w-full px-4 py-3 text-white bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiHelpCircle size={18} />
                  <span>Manage Questions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 