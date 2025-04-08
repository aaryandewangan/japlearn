'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/layout/Header';
import { FiBook, FiEdit3, FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function KanjiPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-gray-900 dark:text-white">Learn Basic Kanji</span>
              <span className="block text-2xl text-purple-500 mt-1">漢字を学ぶ</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Master essential Japanese kanji characters step by step
              <span className="block text-sm mt-1">
                基本的な漢字を段階的に習得する
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
                      Step 1: Learn Readings
                      <span className="block text-sm text-blue-500 mt-1">
                        読み方
                      </span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 ml-16">
                  Learn both On-yomi and Kun-yomi readings for basic kanji
                  <span className="block text-sm mt-1">
                    基本漢字の音読み・訓読みを学ぶ
                  </span>
                </p>
                <div className="ml-16">
                  <button
                    onClick={() => router.push('/category/basic-kanji/lessons')}
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
                      Step 2: Writing Practice
                      <span className="block text-sm text-green-500 mt-1">
                        書き方練習
                      </span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 ml-16">
                  Practice stroke order and writing compounds
                  <span className="block text-sm mt-1">
                    漢字の書き順と熟語を練習する
                  </span>
                </p>
                <div className="ml-16">
                  <button
                    onClick={() => router.push('/category/basic-kanji/practice')}
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
                      Step 3: Recognition Quiz
                      <span className="block text-sm text-purple-500 mt-1">
                        認識クイズ
                      </span>
                    </h2>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 ml-16">
                  Test your knowledge of kanji meanings and readings
                  <span className="block text-sm mt-1">
                    漢字の意味と読み方の理解度を確認する
                  </span>
                </p>
                <div className="ml-16">
                  <button
                    onClick={() => router.push('/category/basic-kanji/quiz')}
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