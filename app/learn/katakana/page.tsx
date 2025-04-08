'use client';

import React, { useState } from 'react';
import Header from '@/app/components/layout/Header';
import { katakanaData } from '@/app/data/katakana';

interface KatakanaCharacter {
  kana: string;
  romaji: string;
  type: string;
}

interface KatakanaLesson {
  id: string;
  title: string;
  subtitle: string;
  characters: string[];
  content: string;
}

export default function LearnKatakana() {
  const [activeLesson, setActiveLesson] = useState<KatakanaLesson>(katakanaData.lessons[0]);
  const [activeChar, setActiveChar] = useState<string>(activeLesson.characters[0]);

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Learn Katakana
            </h1>
            <p className="text-purple-600 dark:text-purple-400 text-xl mb-4">
              カタカナ を ならう
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-2 mb-8">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
              Gojūon
              <span className="ml-2 text-sm">五十音</span>
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg">
              Dakuon
              <span className="ml-2 text-sm">濁音</span>
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg">
              Handakuon
              <span className="ml-2 text-sm">半濁音</span>
            </button>
            <button className="px-4 py-2 bg-white text-gray-600 rounded-lg">
              Combinations
              <span className="ml-2 text-sm">拗音</span>
            </button>
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-600 dark:text-gray-400">
              The basic 46 characters of Katakana arranged in the traditional order
            </p>
          </div>

          <div className="text-center mb-8">
            <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Complete Katakana Chart
            </button>
          </div>

          {/* Understanding Section */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Understanding Gojūon (五十音)
            </h2>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-purple-600">1.</span>
                Gojūon literally means "fifty sounds", though modern Japanese uses 46 basic characters.
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600">2.</span>
                Characters are arranged in a systematic table with 5 vowels (ア、イ、ウ、エ、オ).
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600">3.</span>
                Each consonant group (like カ、キ、ク、ケ、コ) follows the same vowel pattern.
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600">4.</span>
                These are the basic, unvoiced sounds of Katakana.
              </li>
            </ul>
          </div>

          {/* Lessons List */}
          <div className="max-w-4xl mx-auto">
            <div className="flex">
              {/* Sidebar */}
              <div className="w-1/3 pr-6">
                {katakanaData.lessons.map((lesson: KatakanaLesson, index: number) => (
                  <div
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer mb-2 ${
                      activeLesson.id === lesson.id ? 'bg-purple-600 text-white' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{lesson.title}</div>
                      <div className="text-sm opacity-80">{lesson.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div className="w-2/3">
                <div className="bg-white rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">
                    Lesson {activeLesson.title}
                  </h2>

                  {/* Character Display */}
                  <div className="grid grid-cols-5 gap-4 mb-8">
                    {activeLesson.characters.map((char: string) => (
                      <div
                        key={char}
                        onClick={() => setActiveChar(char)}
                        className={`text-center cursor-pointer ${
                          char === activeChar ? 'text-purple-600' : ''
                        }`}
                      >
                        <div className={`text-4xl mb-2 p-4 rounded-lg ${
                          char === activeChar ? 'bg-purple-600 text-white' : 'bg-gray-50'
                        }`}>
                          {char}
                        </div>
                        <div className="text-sm text-gray-600">
                          {katakanaData.basic.find((k: KatakanaCharacter) => k.kana === char)?.romaji}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Example Words */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Example Words</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-bold">
                            アメリカ
                          </div>
                          <div className="text-gray-600">
                            amerika = America
                          </div>
                        </div>
                        <button className="text-purple-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 