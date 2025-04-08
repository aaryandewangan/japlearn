'use client'
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === 'loading') {
    return <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-200 
            hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 text-base font-medium text-white bg-purple-500 
            hover:bg-purple-600 rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 
          dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
          <FiUser className="text-white text-lg" />
        </div>
        <FiChevronDown className={`text-gray-600 dark:text-gray-300 transition-transform text-lg
          ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-gray-800 
          rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <Link
            href="/profile"
            className="flex items-center gap-3 px-5 py-3 text-base text-gray-700 dark:text-gray-300 
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="text-gray-500 text-lg" />
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-5 py-3 text-base text-red-600 
              dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiLogOut className="text-red-500 text-lg" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
} 