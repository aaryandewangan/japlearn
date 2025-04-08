'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import { FiBook, FiEdit3, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function HiraganaPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gray-900 dark:text-white">Learn Hiragana</span>
              <span className="block text-2xl text-purple-500 mt-1">ひらがな を ならう</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Master the basic Japanese writing system step by step
              <span className="block text-sm mt-1">
                日本語の基礎文字体系を段階的に習得する
              </span>
            </p>
          </div>

          {/* Learning Path Flow */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Lessons */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    <FiBook className="text-blue-500" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Step 1: Lessons
                      <span className="block text-sm text-blue-500 mt-1">
                        レッスン
                      </span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 ml-16">
                  Learn all 46 basic Hiragana characters with clear explanations
                  <span className="block text-sm mt-1">
                    46文字のひらがなを分かりやすく学ぶ
                  </span>
                </p>
                <div className="ml-16">
                  <button
                    onClick={() => router.push('/category/hiragana/lessons')}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Start Learning
                    <FiArrowRight />
                  </button>
                </div>
              </div>
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Step 2: Practice */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <FiEdit3 className="text-green-500" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Step 2: Practice
                      <span className="block text-sm text-green-500 mt-1">
                        練習
                      </span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 ml-16">
                  Practice writing and recognizing Hiragana characters
                  <span className="block text-sm mt-1">
                    ひらがなの書き方と読み方を練習する
                  </span>
                </p>
                <div className="ml-16">
                  <button
                    onClick={() => router.push('/category/hiragana/practice')}
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Start Practice
                    <FiArrowRight />
                  </button>
                </div>
              </div>
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 w-0.5 h-8 bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Step 3: Quiz */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                    <FiCheckCircle className="text-purple-500" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Step 3: Quiz
                      <span className="block text-sm text-purple-500 mt-1">
                        クイズ
                      </span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 ml-16">
                  Test your knowledge with 10-question quizzes
                  <span className="block text-sm mt-1">
                    10問のクイズで学習の成果を確認する
                  </span>
                </p>
                <div className="ml-16">
                  <button
                    onClick={() => router.push('/category/hiragana/quiz')}
                    className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    Start Quiz
                    <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 