'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const characters = [
    { char: '4', kanji: '四', reading: 'よん (yon)' },
    { char: '0', kanji: '零', reading: 'まる (maru)' },
    { char: '4', kanji: '四', reading: 'よん (yon)' },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center pt-32 bg-white dark:bg-gray-900 p-4">
      <div className="text-center space-y-6">
        {/* 404 in Large Numbers */}
        <div className="flex justify-center gap-4">
          {characters.map((char, index) => (
            <div
              key={index}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                className="text-7xl md:text-8xl font-bold text-[#6C47FF] cursor-pointer relative"
              >
                <span className="block group-hover:opacity-0 transition-opacity">
                  {char.char}
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {char.kanji}
                </span>
              </motion.div>
              {/* Tooltip */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg text-sm">
                <div className="text-[#6C47FF] font-medium">{char.reading}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Not Found Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            ページが見つかりません
          </p>
        </motion.div>

        {/* English Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 dark:text-gray-300"
        >
          The page you're looking for has gone on a journey
        </motion.p>

        {/* Learning Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm mx-auto shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <h2 className="text-base font-medium text-gray-900 dark:text-white mb-2">
            While you're here, learn something new!
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Did you know? In Japanese, 404 can be read as:
          </p>
          <p className="text-sm font-medium text-[#6C47FF]">
            よん まる よん (yon maru yon)
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Link href="/">
            <motion.button
              className="bg-[#6C47FF] text-white px-8 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ホーム (Home)
            </motion.button>
          </Link>
          <Link href="/dashboard">
            <motion.button
              className="border border-gray-200 dark:border-gray-700 px-8 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              レッスン (Lessons)
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 