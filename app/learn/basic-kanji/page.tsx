'use client';

import React from 'react';
import Header from '@/app/components/layout/Header';
import Link from 'next/link';

export default function LearnKanji() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Basic Kanji 漢字
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Essential Chinese characters used in Japanese writing
            </p>
          </div>

          {/* Description Content */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What is Kanji?
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  Kanji are Chinese characters adopted for writing Japanese. Unlike Hiragana and Katakana, each Kanji can represent multiple meanings and pronunciations, making them a fundamental part of Japanese writing.
                </p>
                <p className="mb-4">
                  While there are thousands of Kanji characters, mastering the basic and most frequently used ones will help you read and understand everyday Japanese text.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                When is Kanji Used?
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Writing nouns, verb and adjective stems in Japanese</li>
                <li>• Expressing complex concepts with single characters</li>
                <li>• Names of people, places, and organizations</li>
                <li>• Official documents and formal writing</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Learning Structure
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The Kanji system includes:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Over 2,000 commonly used characters</li>
                <li>• Multiple readings (On-yomi and Kun-yomi)</li>
                <li>• Radicals (basic building blocks)</li>
                <li>• Compound words (combinations of kanji)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Learning Approach
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  Start with basic kanji used in everyday life, focusing on the most frequent characters first. Learn both the meaning and common readings, and practice writing to reinforce memory. Understanding radicals will help you recognize and remember new kanji more easily.
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <Link href="/category/basic-kanji/lessons">
              <button className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                transition-colors font-medium mt-8">
                Start Learning Kanji →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 