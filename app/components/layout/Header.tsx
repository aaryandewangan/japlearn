'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitcher from '../ThemeSwitcher';
import { motion } from 'framer-motion';

export default function Header() {
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Learn', href: '/learn' },
    { name: 'Practice', href: '/practice' },
    { name: 'Community', href: '/community' },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
              whileHover={{ scale: 1.05 }}
            >
              JapLearn
            </motion.span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.span
                  className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="hidden sm:flex items-center gap-4">
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-orange-500">🔥</span>
                <span className="font-medium text-orange-600 dark:text-orange-400">{streak}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-100 dark:bg-yellow-900/30"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium text-yellow-600 dark:text-yellow-400">{xp} XP</span>
              </motion.div>
            </div>

            {/* Theme Switcher */}
            <ThemeSwitcher />

            {/* Profile/Login Button */}
            <motion.button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>
    </header>
  );
} 