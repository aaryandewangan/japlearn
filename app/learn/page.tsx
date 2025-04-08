'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CATEGORIES, LESSONS_NEW } from '../data/lessons';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { FiAlertCircle } from 'react-icons/fi';

export default function LearnPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const session = useSession();
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeenWarning = localStorage.getItem('hasSeenBrowserWarning');
    if (!hasSeenWarning) {
      setShowWarning(true);
    }
  }, [session]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Header />
      <main className="flex-1 pt-16">

        {showWarning && (
          <div className="container mx-auto px-4 mb-8">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-yellow-500 text-xl flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 dark:text-gray-200">
                  For the best experience with voice lessons, please use Chrome Browser
                  <span className="block text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Other browsers might have limited voice functionality
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Hero Section - removed pattern background */}
        <div className="relative">
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-7xl font-bold mb-6">
                <span className="block text-red-500 mb-2 relative z-10">日本語</span>
                <span className="text-3xl relative z-10 text-black dark:text-white">
                  Japanese Language Learning
                </span>
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-black dark:text-white">
                Master Japanese through our structured learning path
              </p>
            </motion.div>

            {/* Learning Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((category, index) => {
                const categoryLessons = LESSONS_NEW.filter(
                  lesson => lesson.category === category.id
                );

                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl flex flex-col h-full"
                  >
                    <div className="text-6xl mb-4 text-gray-900 dark:text-white">
                      {category.icon}
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                      {category.description}
                    </p>
                    
                    {/* Lesson List */}
                    <div className="space-y-3 mb-6">
                      {categoryLessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          className="flex items-center p-3 rounded-xl"
                        >
                          <span className="text-3xl mr-3 text-gray-900 dark:text-white">
                            {lesson.icon}
                          </span>
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {lesson.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {lesson.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Link href={`/category/${category.id}`}>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center"
                        >
                          Continue Learning →
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
