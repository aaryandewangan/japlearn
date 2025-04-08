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

export default function KatakanaPractice() {
  const [mode, setMode] = useState<PracticeMode>('drawing');
  const [selectedGroup, setSelectedGroup] = useState<CharacterGroup>('gojuon');
  const canvasRefs = useRef<{ [key: string]: any }>({});

  const characterGroups = {
    gojuon: [
      { kana: 'ア', romaji: 'a', heading: 'Vowels (母音)' },
      { kana: 'イ', romaji: 'i' },
      { kana: 'ウ', romaji: 'u' },
      { kana: 'エ', romaji: 'e' },
      { kana: 'オ', romaji: 'o' },
      { kana: 'カ', romaji: 'ka', heading: 'K-Group (カ行)' },
      { kana: 'キ', romaji: 'ki' },
      { kana: 'ク', romaji: 'ku' },
      { kana: 'ケ', romaji: 'ke' },
      { kana: 'コ', romaji: 'ko' },
      { kana: 'サ', romaji: 'sa', heading: 'S-Group (サ行)' },
      { kana: 'シ', romaji: 'shi' },
      { kana: 'ス', romaji: 'su' },
      { kana: 'セ', romaji: 'se' },
      { kana: 'ソ', romaji: 'so' },
      { kana: 'タ', romaji: 'ta', heading: 'T-Group (タ行)' },
      { kana: 'チ', romaji: 'chi' },
      { kana: 'ツ', romaji: 'tsu' },
      { kana: 'テ', romaji: 'te' },
      { kana: 'ト', romaji: 'to' },
      { kana: 'ナ', romaji: 'na', heading: 'N-Group (ナ行)' },
      { kana: 'ニ', romaji: 'ni' },
      { kana: 'ヌ', romaji: 'nu' },
      { kana: 'ネ', romaji: 'ne' },
      { kana: 'ノ', romaji: 'no' },
      { kana: 'ハ', romaji: 'ha', heading: 'H-Group (ハ行)' },
      { kana: 'ヒ', romaji: 'hi' },
      { kana: 'フ', romaji: 'fu' },
      { kana: 'ヘ', romaji: 'he' },
      { kana: 'ホ', romaji: 'ho' },
      { kana: 'マ', romaji: 'ma', heading: 'M-Group (マ行)' },
      { kana: 'ミ', romaji: 'mi' },
      { kana: 'ム', romaji: 'mu' },
      { kana: 'メ', romaji: 'me' },
      { kana: 'モ', romaji: 'mo' },
      { kana: 'ヤ', romaji: 'ya', heading: 'Y-Group (ヤ行)' },
      { kana: 'ユ', romaji: 'yu' },
      { kana: 'ヨ', romaji: 'yo' },
      { kana: 'ラ', romaji: 'ra', heading: 'R-Group (ラ行)' },
      { kana: 'リ', romaji: 'ri' },
      { kana: 'ル', romaji: 'ru' },
      { kana: 'レ', romaji: 're' },
      { kana: 'ロ', romaji: 'ro' },
      { kana: 'ワ', romaji: 'wa', heading: 'W-Group (ワ行)' },
      { kana: 'ヲ', romaji: 'wo' },
      { kana: 'ン', romaji: 'n', heading: 'N (ン)' },
    ],
    dakuon: [
      { kana: 'ガ', romaji: 'ga', heading: 'G-Group (ガ行)' },
      { kana: 'ギ', romaji: 'gi' },
      { kana: 'グ', romaji: 'gu' },
      { kana: 'ゲ', romaji: 'ge' },
      { kana: 'ゴ', romaji: 'go' },
      { kana: 'ザ', romaji: 'za', heading: 'Z-Group (ザ行)' },
      { kana: 'ジ', romaji: 'ji' },
      { kana: 'ズ', romaji: 'zu' },
      { kana: 'ゼ', romaji: 'ze' },
      { kana: 'ゾ', romaji: 'zo' },
      { kana: 'ダ', romaji: 'da', heading: 'D-Group (ダ行)' },
      { kana: 'ヂ', romaji: 'ji' },
      { kana: 'ヅ', romaji: 'zu' },
      { kana: 'デ', romaji: 'de' },
      { kana: 'ド', romaji: 'do' },
      { kana: 'バ', romaji: 'ba', heading: 'B-Group (バ行)' },
      { kana: 'ビ', romaji: 'bi' },
      { kana: 'ブ', romaji: 'bu' },
      { kana: 'ベ', romaji: 'be' },
      { kana: 'ボ', romaji: 'bo' },
    ],
    handakuon: [
      { kana: 'パ', romaji: 'pa', heading: 'P-Group (パ行)' },
      { kana: 'ピ', romaji: 'pi' },
      { kana: 'プ', romaji: 'pu' },
      { kana: 'ペ', romaji: 'pe' },
      { kana: 'ポ', romaji: 'po' },
    ],
    combinations: [
      { kana: 'キャ', romaji: 'kya', heading: 'K-Group Combinations (キャ行)' },
      { kana: 'キュ', romaji: 'kyu' },
      { kana: 'キョ', romaji: 'kyo' },
      { kana: 'ギャ', romaji: 'gya', heading: 'G-Group Combinations (ギャ行)' },
      { kana: 'ギュ', romaji: 'gyu' },
      { kana: 'ギョ', romaji: 'gyo' },
      { kana: 'シャ', romaji: 'sha', heading: 'S-Group Combinations (シャ行)' },
      { kana: 'シュ', romaji: 'shu' },
      { kana: 'ショ', romaji: 'sho' },
      { kana: 'ジャ', romaji: 'ja', heading: 'J-Group Combinations (ジャ行)' },
      { kana: 'ジュ', romaji: 'ju' },
      { kana: 'ジョ', romaji: 'jo' },
      { kana: 'チャ', romaji: 'cha', heading: 'Ch-Group Combinations (チャ行)' },
      { kana: 'チュ', romaji: 'chu' },
      { kana: 'チョ', romaji: 'cho' },
      { kana: 'ニャ', romaji: 'nya', heading: 'N-Group Combinations (ニャ行)' },
      { kana: 'ニュ', romaji: 'nyu' },
      { kana: 'ニョ', romaji: 'nyo' },
      { kana: 'ヒャ', romaji: 'hya', heading: 'H-Group Combinations (ヒャ行)' },
      { kana: 'ヒュ', romaji: 'hyu' },
      { kana: 'ヒョ', romaji: 'hyo' },
      { kana: 'ビャ', romaji: 'bya', heading: 'B-Group Combinations (ビャ行)' },
      { kana: 'ビュ', romaji: 'byu' },
      { kana: 'ビョ', romaji: 'byo' },
      { kana: 'ピャ', romaji: 'pya', heading: 'P-Group Combinations (ピャ行)' },
      { kana: 'ピュ', romaji: 'pyu' },
      { kana: 'ピョ', romaji: 'pyo' },
      { kana: 'ミャ', romaji: 'mya', heading: 'M-Group Combinations (ミャ行)' },
      { kana: 'ミュ', romaji: 'myu' },
      { kana: 'ミョ', romaji: 'myo' },
      { kana: 'リャ', romaji: 'rya', heading: 'R-Group Combinations (リャ行)' },
      { kana: 'リュ', romaji: 'ryu' },
      { kana: 'リョ', romaji: 'ryo' },
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