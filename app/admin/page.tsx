'use client'
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import EditPasswordModal from '@/app/components/EditPasswordModal';
import { showToast } from '@/app/components/CustomToast';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import { FiUsers, FiFileText, FiSettings } from 'react-icons/fi';

interface User {
  id: string;
  email: string;
  name: string;
  notesCount: number;
  lastActive: string;
  is_admin: boolean;
}

interface SessionUser {
  id: string;
  email: string;
  name?: string;
  is_admin: boolean;
}

interface ToggleAdminResponse {
  success: boolean;
  user: User;
}

interface UpdatePasswordResponse {
  success: boolean;
}

export default function AdminDashboard() {
  const { data: session, status, update: updateSession } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [confirmAction, setConfirmAction] = useState<{
    type: 'delete' | 'role';
    user: User | null;
  } | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [activeTab, setActiveTab] = useState<'users' | 'notes' | 'settings'>('users');

  useEffect(() => {
    if (status === 'loading') return;
    
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const sessionUser = session?.user as SessionUser | undefined;
    const isAdmin = sessionUser?.is_admin || sessionUser?.email === 'admin@japlearn.com';

    if (!isAdmin) {
      router.push('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [status, session, router]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setUsers(users.filter(user => user.id !== userId));
        showToast.success('User deleted successfully');
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      showToast.error(errorMessage);
      setError(errorMessage);
    }
  };

  const handleToggleAdmin = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_admin: !user.is_admin,
        }),
      });
      
      const data: ToggleAdminResponse = await response.json();

      if (data.success && data.user) {
        setUsers(users.map(u => 
          u.id === user.id ? data.user : u
        ));

        const sessionUser = session?.user as SessionUser;
        if (user.id === sessionUser?.id) {
          await updateSession({
            ...session,
            user: {
              ...sessionUser,
              is_admin: data.user.is_admin
            }
          });
        }

        showToast.success(
          user.is_admin 
            ? 'Admin privileges removed' 
            : 'Admin privileges granted'
        );
      } else {
        throw new Error('Failed to update user role');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update user role';
      showToast.error(errorMessage);
    }
  };

  const handleUpdatePassword = async (newPassword: string) => {
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users/${editingUser.id}/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      const data: UpdatePasswordResponse = await response.json();

      if (data.success) {
        showToast.success('Password updated successfully');
        setEditingUser(null);
      } else {
        throw new Error('Failed to update password');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update password';
      showToast.error(errorMessage);
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => 
    (user.email.toLowerCase().includes(search.toLowerCase()) ||
     user.name.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'all' || 
     (roleFilter === 'admin' && user.is_admin) || 
     (roleFilter === 'user' && !user.is_admin))
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Show loading state while checking authentication
  if (status === 'loading' || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't show anything while redirecting
  if (!session || !(session.user as SessionUser)?.is_admin) {
    return null;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center text-red-600">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Admin Navigation */}
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-4 p-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'users'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiUsers className="mr-2" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'notes'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiFileText className="mr-2" />
                  Notes Overview
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    activeTab === 'settings'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <FiSettings className="mr-2" />
                  Settings
                </button>
              </nav>
            </div>

            {/* Content Area */}
            <div className="p-4">
              {activeTab === 'users' && (
                <div className="overflow-x-auto">
                  {/* Search and filters */}
                  <div className="mb-4 flex gap-4">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value as 'all' | 'admin' | 'user')}
                      className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white"
                    >
                      <option value="all">All Users</option>
                      <option value="admin">Admins</option>
                      <option value="user">Regular Users</option>
                    </select>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Notes
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {paginatedUsers.map((user) => (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${user.is_admin 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-gray-100 text-gray-800'}`}
                            >
                              {user.is_admin ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {user.notesCount} notes
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(user.lastActive).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setEditingUser(user)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Edit Password
                              </button>
                              <button
                                onClick={() => setConfirmAction({ type: 'role', user })}
                                className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                              >
                                {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                              </button>
                              <button
                                onClick={() => setConfirmAction({ type: 'delete', user })}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div className="mt-4 flex justify-center gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === i + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Add notes statistics and charts here */}
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2">Total Notes</h3>
                    {/* Add statistics */}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="max-w-2xl">
                  {/* Add admin settings here */}
                  <h3 className="text-lg font-semibold mb-4">Admin Settings</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <EditPasswordModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSubmit={handleUpdatePassword}
        userEmail={editingUser?.email || ''}
      />
      <ConfirmDialog
        isOpen={confirmAction?.type === 'delete'}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          if (confirmAction?.user) {
            handleDeleteUser(confirmAction.user.id);
          }
        }}
        title="Delete User"
        message={`Are you sure you want to delete ${confirmAction?.user?.email}? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
      <ConfirmDialog
        isOpen={confirmAction?.type === 'role'}
        onClose={() => setConfirmAction(null)}
        onConfirm={() => {
          if (confirmAction?.user) {
            handleToggleAdmin(confirmAction.user);
          }
        }}
        title={confirmAction?.user?.is_admin ? 'Remove Admin' : 'Make Admin'}
        message={`Are you sure you want to ${
          confirmAction?.user?.is_admin ? 'remove admin privileges from' : 'make'
        } ${confirmAction?.user?.email} ${
          !confirmAction?.user?.is_admin ? 'an admin' : ''
        }?`}
        confirmText={confirmAction?.user?.is_admin ? 'Remove Admin' : 'Make Admin'}
        type="warning"
      />
    </>
  );
}