'use client';

import React from 'react';
import Header from '@/app/components/layout/Header';
import Link from 'next/link';

export default function LearnHiragana() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Hiragana ひらがな
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Basic Japanese phonetic alphabet
            </p>
          </div>

          {/* Description Content */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What is Hiragana?
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  Hiragana is one of the three writing systems used in the Japanese language. It's a phonetic alphabet where each character represents a specific sound, making it the foundation of Japanese writing and pronunciation.
                </p>
                <p className="mb-4">
                  Originally derived from Chinese characters, Hiragana was simplified to create a more accessible writing system. Today, it's typically the first writing system taught to Japanese learners and young native speakers.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                When is Hiragana Used?
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• Writing grammatical elements and particles in Japanese sentences</li>
                <li>• Writing native Japanese words that don't have kanji representations</li>
                <li>• Writing furigana (reading aids) above kanji characters</li>
                <li>• Children's books and materials for Japanese learners</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Learning Structure
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The Hiragana system consists of:
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li>• 46 basic characters</li>
                <li>• 25 voiced sound variations (dakuon)</li>
                <li>• 33 combined sound variations (yōon)</li>
                <li>• Additional special characters for specific sounds</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Why Learn Hiragana First?
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="mb-4">
                  Hiragana is essential for anyone starting to learn Japanese. It provides the foundation for reading and writing, and unlike kanji, each character has only one pronunciation. This makes it an ideal starting point for understanding Japanese phonetics and grammar structure.
                </p>
              </div>
            </div>

            {/* Continue Button */}
            <Link href="/category/hiragana/practice">
              <button className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 
                transition-colors font-medium mt-8">
                Start Learning Hiragana →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 