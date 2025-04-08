'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = (session?.user as any)?.is_admin || session?.user?.email === 'admin@japlearn.com';
  const pathname = usePathname();

  // Unified navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn', path: '/learn' },
    { name: 'Tests', path: '/tests' },
    { name: 'Notes', path: '/notes', show: !isAdmin },
    { name: 'Community', path: '/community' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard', show: !isAdmin },
    { name: 'Admin Dashboard', path: '/admindashboard', show: isAdmin }
  ];

  // Filter visible navigation items
  const visibleNavItems = navItems.filter(item => item.show === undefined || item.show);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 
              to-purple-400 text-transparent bg-clip-text tracking-tight"
          >
            JapLearn
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {visibleNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  pathname === item.path ? 'bg-purple-100 dark:bg-gray-700' : ''
                }`}
              >
                <div className="font-medium">{item.name}</div>
              </Link>
            ))}
          </nav>

          {/* Controls & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <>
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
                <UserMenu />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="flex flex-col py-4 space-y-2">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!session && (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
            <div className="py-4 px-4 border-t border-gray-200 dark:border-gray-700">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 