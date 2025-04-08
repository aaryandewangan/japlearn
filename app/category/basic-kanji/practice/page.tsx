'use client'
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/app/components/layout/Header';
import { FiEdit3, FiType, FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { ReactSketchCanvas } from 'react-sketch-canvas';

type PracticeMode = 'drawing' | 'typing';
type CharacterGroup = 'gojuon' | 'dakuon' | 'handakuon' | 'combinations';

interface Character {
  kana: string;
  romaji: string;
  heading?: string;  // Optional heading for group separation
}

const styles = {
  sketchGrid: {
    backgroundImage: `
      linear-gradient(to right, #e5e7eb 1px, transparent 1px),
      linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
  }
};

export default function HiraganaPractice() {
  const [mode, setMode] = useState<PracticeMode>('drawing');
  const [selectedGroup, setSelectedGroup] = useState<CharacterGroup>('gojuon');
  const canvasRefs = useRef<{ [key: string]: any }>({});

  const characterGroups = {
    gojuon: [
      { kana: 'あ', romaji: 'a', heading: 'Vowels (母音)' },
      { kana: 'い', romaji: 'i' },
      { kana: 'う', romaji: 'u' },
      { kana: 'え', romaji: 'e' },
      { kana: 'お', romaji: 'o' },
      { kana: 'か', romaji: 'ka', heading: 'K-Group (か行)' },
      { kana: 'き', romaji: 'ki' },
      { kana: 'く', romaji: 'ku' },
      { kana: 'け', romaji: 'ke' },
      { kana: 'こ', romaji: 'ko' },
      { kana: 'さ', romaji: 'sa', heading: 'S-Group (さ行)' },
      { kana: 'し', romaji: 'shi' },
      { kana: 'す', romaji: 'su' },
      { kana: 'せ', romaji: 'se' },
      { kana: 'そ', romaji: 'so' },
      { kana: 'た', romaji: 'ta', heading: 'T-Group (た行)' },
      { kana: 'ち', romaji: 'chi' },
      { kana: 'つ', romaji: 'tsu' },
      { kana: 'て', romaji: 'te' },
      { kana: 'と', romaji: 'to' },
      { kana: 'な', romaji: 'na', heading: 'N-Group (な行)' },
      { kana: 'に', romaji: 'ni' },
      { kana: 'ぬ', romaji: 'nu' },
      { kana: 'ね', romaji: 'ne' },
      { kana: 'の', romaji: 'no' },
      { kana: 'は', romaji: 'ha', heading: 'H-Group (は行)' },
      { kana: 'ひ', romaji: 'hi' },
      { kana: 'ふ', romaji: 'fu' },
      { kana: 'へ', romaji: 'he' },
      { kana: 'ほ', romaji: 'ho' },
      { kana: 'ま', romaji: 'ma', heading: 'M-Group (ま行)' },
      { kana: 'み', romaji: 'mi' },
      { kana: 'む', romaji: 'mu' },
      { kana: 'め', romaji: 'me' },
      { kana: 'も', romaji: 'mo' },
      { kana: 'や', romaji: 'ya', heading: 'Y-Group (や行)' },
      { kana: 'ゆ', romaji: 'yu' },
      { kana: 'よ', romaji: 'yo' },
      { kana: 'ら', romaji: 'ra', heading: 'R-Group (ら行)' },
      { kana: 'り', romaji: 'ri' },
      { kana: 'る', romaji: 'ru' },
      { kana: 'れ', romaji: 're' },
      { kana: 'ろ', romaji: 'ro' },
      { kana: 'わ', romaji: 'wa', heading: 'W-Group (わ行)' },
      { kana: 'を', romaji: 'wo' },
      { kana: 'ん', romaji: 'n', heading: 'N (ん)' },
    ],
    dakuon: [
      { kana: 'が', romaji: 'ga', heading: 'G-Group (が行)' },
      { kana: 'ぎ', romaji: 'gi' },
      { kana: 'ぐ', romaji: 'gu' },
      { kana: 'げ', romaji: 'ge' },
      { kana: 'ご', romaji: 'go' },
      { kana: 'ざ', romaji: 'za', heading: 'Z-Group (ざ行)' },
      { kana: 'じ', romaji: 'ji' },
      { kana: 'ず', romaji: 'zu' },
      { kana: 'ぜ', romaji: 'ze' },
      { kana: 'ぞ', romaji: 'zo' },
      { kana: 'だ', romaji: 'da', heading: 'D-Group (だ行)' },
      { kana: 'ぢ', romaji: 'ji' },
      { kana: 'づ', romaji: 'zu' },
      { kana: 'で', romaji: 'de' },
      { kana: 'ど', romaji: 'do' },
      { kana: 'ば', romaji: 'ba', heading: 'B-Group (ば行)' },
      { kana: 'び', romaji: 'bi' },
      { kana: 'ぶ', romaji: 'bu' },
      { kana: 'べ', romaji: 'be' },
      { kana: 'ぼ', romaji: 'bo' },
    ],
    handakuon: [
      { kana: 'ぱ', romaji: 'pa', heading: 'P-Group (ぱ行)' },
      { kana: 'ぴ', romaji: 'pi' },
      { kana: 'ぷ', romaji: 'pu' },
      { kana: 'ぺ', romaji: 'pe' },
      { kana: 'ぽ', romaji: 'po' },
    ],
    combinations: [
      { kana: 'きゃ', romaji: 'kya', heading: 'K-Group Combinations (きゃ行)' },
      { kana: 'きゅ', romaji: 'kyu' },
      { kana: 'きょ', romaji: 'kyo' },
      { kana: 'ぎゃ', romaji: 'gya', heading: 'G-Group Combinations (ぎゃ行)' },
      { kana: 'ぎゅ', romaji: 'gyu' },
      { kana: 'ぎょ', romaji: 'gyo' },
      { kana: 'しゃ', romaji: 'sha', heading: 'S-Group Combinations (しゃ行)' },
      { kana: 'しゅ', romaji: 'shu' },
      { kana: 'しょ', romaji: 'sho' },
      { kana: 'じゃ', romaji: 'ja', heading: 'J-Group Combinations (じゃ行)' },
      { kana: 'じゅ', romaji: 'ju' },
      { kana: 'じょ', romaji: 'jo' },
      { kana: 'ちゃ', romaji: 'cha', heading: 'Ch-Group Combinations (ちゃ行)' },
      { kana: 'ちゅ', romaji: 'chu' },
      { kana: 'ちょ', romaji: 'cho' },
      { kana: 'にゃ', romaji: 'nya', heading: 'N-Group Combinations (にゃ行)' },
      { kana: 'にゅ', romaji: 'nyu' },
      { kana: 'にょ', romaji: 'nyo' },
      { kana: 'ひゃ', romaji: 'hya', heading: 'H-Group Combinations (ひゃ行)' },
      { kana: 'ひゅ', romaji: 'hyu' },
      { kana: 'ひょ', romaji: 'hyo' },
      { kana: 'びゃ', romaji: 'bya', heading: 'B-Group Combinations (びゃ行)' },
      { kana: 'びゅ', romaji: 'byu' },
      { kana: 'びょ', romaji: 'byo' },
      { kana: 'ぴゃ', romaji: 'pya', heading: 'P-Group Combinations (ぴゃ行)' },
      { kana: 'ぴゅ', romaji: 'pyu' },
      { kana: 'ぴょ', romaji: 'pyo' },
      { kana: 'みゃ', romaji: 'mya', heading: 'M-Group Combinations (みゃ行)' },
      { kana: 'みゅ', romaji: 'myu' },
      { kana: 'みょ', romaji: 'myo' },
      { kana: 'りゃ', romaji: 'rya', heading: 'R-Group Combinations (りゃ行)' },
      { kana: 'りゅ', romaji: 'ryu' },
      { kana: 'りょ', romaji: 'ryo' },
    ]
  };

  // Initialize canvas refs
  useEffect(() => {
    const newRefs: { [key: string]: any } = {};
    characterGroups[selectedGroup].forEach(char => {
      if (!canvasRefs.current[char.kana]) {
        newRefs[char.kana] = null;
      }
    });
    canvasRefs.current = { ...canvasRefs.current, ...newRefs };
  }, [selectedGroup]);

  const setCanvasRef = (kana: string, ref: any) => {
    canvasRefs.current[kana] = ref;
  };

  const handleUndo = (kana: string) => {
    canvasRefs.current[kana]?.undo();
  };

  const handleClear = (kana: string) => {
    canvasRefs.current[kana]?.clearCanvas();
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Mode Selection */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setMode('drawing')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                mode === 'drawing'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FiEdit3 />
              Drawing Practice
            </button>
            <button
              onClick={() => setMode('typing')}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 ${
                mode === 'typing'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FiType />
              Typing Practice
            </button>
          </div>

          {/* Character Group Selection */}
          <div className="flex justify-center gap-2 mb-8">
            {Object.entries(characterGroups).map(([group, chars]) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group as CharacterGroup)}
                className={`px-4 py-2 rounded-lg ${
                  selectedGroup === group
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </button>
            ))}
          </div>

          {/* Practice Info Banner */}
          <div className="mb-8 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-center text-blue-700 dark:text-blue-300">
              Feel free to practice as much as you like! Your practice canvas will reset when you refresh the page, 
              allowing for unlimited practice sessions.
            </p>
          </div>

          {/* Practice Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {characterGroups[selectedGroup].map((char, index) => (
              <React.Fragment key={char.kana}>
                {char.heading && (
                  <div className="col-span-full mt-8 mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {char.heading}
                    </h2>
                  </div>
                )}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  {/* Character Display */}
                  <div className="text-center mb-2">
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">
                      {char.kana}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {char.romaji}
                    </div>
                  </div>

                  {/* Practice Area */}
                  {mode === 'drawing' ? (
                    <div className="relative aspect-square">
                      {/* Sketchbook Paper Effect */}
                      <div 
                        className="absolute inset-0 rounded-lg opacity-50 pointer-events-none"
                        style={styles.sketchGrid}
                      />
                      
                      {/* Main Canvas */}
                      <div className="relative border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white">
                        <ReactSketchCanvas
                          ref={(ref) => setCanvasRef(char.kana, ref)}
                          strokeWidth={3}
                          strokeColor="black"
                          width="100%"
                          height="100%"
                          canvasColor="transparent"
                          preserveBackgroundImageAspectRatio="none"
                          className="touch-none"
                        />
                        
                        {/* Canvas Controls */}
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <button
                            onClick={() => handleUndo(char.kana)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full 
                              hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
                              flex items-center justify-center"
                            title="Undo"
                          >
                            <FiRotateCcw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleClear(char.kana)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full 
                              hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300
                              flex items-center justify-center"
                            title="Clear"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Type romaji..."
                        className="w-full px-3 py-2 text-sm rounded-lg border-2 border-gray-200 
                          dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                        onChange={(e) => {
                          const isCorrect = e.target.value.toLowerCase() === char.romaji.toLowerCase();
                          e.target.style.backgroundColor = isCorrect ? '#dcfce7' : '';
                          if (isCorrect) e.target.blur();
                        }}
                      />
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 