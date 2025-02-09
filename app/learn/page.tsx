'use client'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CATEGORIES, LESSONS_NEW as LESSONS } from '../data/lessons';
import Header from '@/app/components/layout/Header';
import Footer from '@/app/components/layout/Footer';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import SakuraAnimation from '@/app/components/SakuraAnimation';
import { sql } from '@vercel/postgres';

// Move the database query to a separate API route or server component
async function getData() {
  try {
    // Replace 'your_table' with your actual table name
    const { rows } = await sql`SELECT * FROM your_table`;
    return rows;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// Split into server and client components
async function LearnPageServer() {
  const data = await getData();
  return { data };
}

export default function LearnPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setMounted(true);
    // Fetch data from an API route instead
    fetch('/api/your-data-endpoint')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  // Use a base style that works for both themes initially
  const baseStyle = "flex flex-col min-h-screen";
  const themeStyle = "bg-slate-50 dark:bg-slate-950";

  return (
    <div className={`${baseStyle} ${themeStyle}`}>
      <Header />
      <main className="flex-1 pt-16">
        <SakuraAnimation />
        {/* Hero Section with Japanese Pattern Background */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/patterns/seigaiha.png')] opacity-5" />
          <div className="relative max-w-7xl mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-7xl font-bold mb-6">
                <span className="block text-red-500 mb-2 relative z-10">日本語</span>
                <span className={`text-3xl relative z-10 text-black dark:text-white`}>
                  Japanese Language Learning
                </span>
              </h1>
              <p className="text-xl max-w-2xl mx-auto text-black dark:text-white">
                Master Japanese through our structured learning path, from basic characters to advanced conversation
              </p>
            </motion.div>

            {/* Learning Paths */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/learn/${category.id}`}>
                    <div className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300
                      bg-white border-slate-200 hover:border-red-500/30 shadow-sm
                      dark:bg-slate-900 dark:border-slate-700 dark:hover:border-red-500/50`}
                    >
                      {/* Category Header */}
                      <div className={`relative h-32 p-6
                        bg-gradient-to-br from-slate-100 to-slate-50
                        dark:from-slate-900 dark:to-slate-800`}
                      >
                        <div className="absolute top-1/2 -translate-y-1/2 right-6 text-6xl opacity-10 group-hover:opacity-20 transition-opacity text-black dark:text-white">
                          {category.icon}
                        </div>
                        <div className="relative">
                          <h3 className={`text-xl font-bold mb-1 text-black dark:text-white`}
                          >
                            {category.label}
                          </h3>
                          <p className="text-black dark:text-white">
                            {category.count} lessons
                          </p>
                        </div>
                      </div>

                      {/* Lesson Preview */}
                      <div className="p-6">
                        <div className="space-y-3">
                          {LESSONS[category.id as keyof typeof LESSONS]?.slice(0, 2).map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`flex items-center gap-3 p-3 rounded-lg transition-colors
                                bg-slate-100/50 hover:bg-slate-100 
                                dark:bg-slate-800 dark:hover:bg-slate-700`}
                            >
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg
                                bg-slate-200 dark:bg-slate-700 text-black dark:text-white`}
                              >
                                {lesson.icon}
                              </div>
                              <div>
                                <p className="font-medium text-sm text-black dark:text-white">
                                  {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-black dark:text-white">
                                  <span>Level {lesson.level}</span>
                                  <span className="w-1 h-1 rounded-full bg-black dark:bg-white" />
                                  <span>{lesson.progress}% Complete</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-6">
                          <div className="h-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <div
                              className="h-full bg-gradient-to-r from-red-500 to-red-600"
                              style={{
                                width: `${LESSONS[category.id as keyof typeof LESSONS]?.reduce((acc, lesson) => acc + lesson.progress, 0) / LESSONS[category.id as keyof typeof LESSONS]?.length || 0}%`
                              }}
                            />
                          </div>
                        </div>

                        {/* Start/Continue Button */}
                        <button className="mt-6 w-full py-2.5 px-4 rounded-lg text-white text-sm font-medium transition-colors
                          bg-slate-900 hover:bg-red-500
                          dark:bg-slate-800 dark:hover:bg-red-500"
                        >
                          Continue Learning →
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
