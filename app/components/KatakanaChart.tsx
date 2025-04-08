'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMaximize, FiVolume2, FiInfo } from 'react-icons/fi';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export default function KatakanaChart() {
  const [isOpen, setIsOpen] = useState(false);
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const gojuon = [
    { row: 'ア行', chars: [
      { kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, 
      { kana: 'ウ', romaji: 'u' }, { kana: 'エ', romaji: 'e' }, 
      { kana: 'オ', romaji: 'o' }
    ]},
    { row: 'カ行', chars: [
      { kana: 'カ', romaji: 'ka' }, { kana: 'キ', romaji: 'ki' },
      { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' },
      { kana: 'コ', romaji: 'ko' }
    ]},
    { row: 'サ行', chars: [
      { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' },
      { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' },
      { kana: 'ソ', romaji: 'so' }
    ]},
    { row: 'タ行', chars: [
      { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' },
      { kana: 'ツ', romaji: 'tsu' }, { kana: 'テ', romaji: 'te' },
      { kana: 'ト', romaji: 'to' }
    ]},
    { row: 'ナ行', chars: [
      { kana: 'ナ', romaji: 'na' }, { kana: 'ニ', romaji: 'ni' },
      { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' },
      { kana: 'ノ', romaji: 'no' }
    ]},
    { row: 'ハ行', chars: [
      { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' },
      { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' },
      { kana: 'ホ', romaji: 'ho' }
    ]},
    { row: 'マ行', chars: [
      { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' },
      { kana: 'ム', romaji: 'mu' }, { kana: 'メ', romaji: 'me' },
      { kana: 'モ', romaji: 'mo' }
    ]},
    { row: 'ヤ行', chars: [
      { kana: 'ヤ', romaji: 'ya' }, { kana: 'ユ', romaji: 'yu' },
      { kana: 'ヨ', romaji: 'yo' }
    ]},
    { row: 'ラ行', chars: [
      { kana: 'ラ', romaji: 'ra' }, { kana: 'リ', romaji: 'ri' },
      { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' },
      { kana: 'ロ', romaji: 'ro' }
    ]},
    { row: 'ワ行', chars: [
      { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' },
      { kana: 'ン', romaji: 'n' }
    ]}
  ];

  const dakuon = [
    { row: 'ガ行', chars: [
      { kana: 'ガ', romaji: 'ga' }, { kana: 'ギ', romaji: 'gi' },
      { kana: 'グ', romaji: 'gu' }, { kana: 'ゲ', romaji: 'ge' },
      { kana: 'ゴ', romaji: 'go' }
    ]},
    { row: 'ザ行', chars: [
      { kana: 'ザ', romaji: 'za' }, { kana: 'ジ', romaji: 'ji' },
      { kana: 'ズ', romaji: 'zu' }, { kana: 'ゼ', romaji: 'ze' },
      { kana: 'ゾ', romaji: 'zo' }
    ]},
    { row: 'ダ行', chars: [
      { kana: 'ダ', romaji: 'da' }, { kana: 'ヂ', romaji: 'ji' },
      { kana: 'ヅ', romaji: 'zu' }, { kana: 'デ', romaji: 'de' },
      { kana: 'ド', romaji: 'do' }
    ]},
    { row: 'バ行', chars: [
      { kana: 'バ', romaji: 'ba' }, { kana: 'ビ', romaji: 'bi' },
      { kana: 'ブ', romaji: 'bu' }, { kana: 'ベ', romaji: 'be' },
      { kana: 'ボ', romaji: 'bo' }
    ]}
  ];

  const handakuon = [
    { row: 'パ行', chars: [
      { kana: 'パ', romaji: 'pa' }, { kana: 'ピ', romaji: 'pi' },
      { kana: 'プ', romaji: 'pu' }, { kana: 'ペ', romaji: 'pe' },
      { kana: 'ポ', romaji: 'po' }
    ]}
  ];

  const playAudio = useCallback((text: string) => {
    try {
      if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported');
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.lang.includes('ja') || 
        v.lang.includes('JP') || 
        v.name.toLowerCase().includes('japanese')
      ) || japaneseVoice;

      if (voice) {
        utterance.voice = voice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }, [japaneseVoice]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.lang.includes('ja') || 
        v.lang.includes('JP') || 
        v.name.toLowerCase().includes('japanese')
      );
      if (voice) setJapaneseVoice(voice);
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const getEnglishRow = (japaneseRow: string) => {
    const translations: { [key: string]: string } = {
      'ア行': 'A-row (A-gyō)',
      'カ行': 'K-row (Ka-gyō)',
      'サ行': 'S-row (Sa-gyō)',
      'タ行': 'T-row (Ta-gyō)',
      'ナ行': 'N-row (Na-gyō)',
      'ハ行': 'H-row (Ha-gyō)',
      'マ行': 'M-row (Ma-gyō)',
      'ヤ行': 'Y-row (Ya-gyō)',
      'ラ行': 'R-row (Ra-gyō)',
      'ワ行': 'W-row (Wa-gyō)',
      'ガ行': 'G-row (Ga-gyō)',
      'ザ行': 'Z-row (Za-gyō)',
      'ダ行': 'D-row (Da-gyō)',
      'バ行': 'B-row (Ba-gyō)',
      'パ行': 'P-row (Pa-gyō)',
    };
    return translations[japaneseRow] || japaneseRow;
  };

  const CharacterCell = ({ kana, romaji }: { kana: string, romaji: string }) => (
    <motion.div 
      whileHover={!isMobile ? { scale: 1.05 } : undefined}
      whileTap={{ scale: 0.95 }}
      onClick={() => playAudio(kana)}
      onMouseEnter={() => setShowTooltip(kana)}
      onMouseLeave={() => setShowTooltip(null)}
      role="button"
      aria-label={`${kana} - ${romaji}`}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          playAudio(kana);
        }
      }}
      className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg cursor-pointer 
        hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all
        group relative shadow-sm hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {kana}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {romaji}
      </div>
      <FiVolume2 
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 
          transition-opacity text-purple-500" 
        aria-hidden="true"
      />
      {showTooltip === kana && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white 
          px-2 py-1 rounded text-sm whitespace-nowrap z-10 shadow-lg">
          Click to hear pronunciation
        </div>
      )}
    </motion.div>
  );

  const TableSection = ({ 
    data, 
    title, 
    japaneseTitle,
    description 
  }: { 
    data: any[], 
    title: string,
    japaneseTitle: string,
    description: string
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <span className="text-purple-500">{title}</span>
          <span className="text-gray-600 dark:text-gray-400">{japaneseTitle}</span>
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="space-y-6">
        {data.map((row, idx) => (
          <div key={idx} className={`
            grid gap-3
            ${isMobile ? 'grid-cols-3' : 'grid-cols-6'}
          `}>
            <div className="flex flex-col items-center justify-center font-medium text-gray-700 
              dark:text-gray-300 col-span-full mb-2 bg-gray-50 dark:bg-gray-900 
              py-2 rounded-lg">
              <span className="text-purple-600 dark:text-purple-400">{row.row}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{getEnglishRow(row.row)}</span>
            </div>
            {row.chars.map((char: any, charIdx: number) => (
              <CharacterCell key={charIdx} kana={char.kana} romaji={char.romaji} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="text-center mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Complete Katakana Chart
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl max-w-5xl w-full max-h-[90vh] 
                overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 flex items-center 
                justify-between p-4 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
                <h2 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
                  Complete Katakana Chart
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {}}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                      dark:hover:text-gray-300 group relative"
                    aria-label="Help"
                  >
                    <FiInfo size={20} />
                    <span className="absolute bottom-full mb-2 right-0 
                      bg-gray-900 text-white px-3 py-2 rounded text-sm whitespace-nowrap 
                      opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      Click any character to hear pronunciation
                    </span>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                      dark:hover:text-gray-300"
                    aria-label="Close chart"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <TableSection 
                  data={gojuon} 
                  title="Gojūon" 
                  japaneseTitle="五十音"
                  description="Basic Katakana characters arranged in the traditional 5×10 grid"
                />
                <TableSection 
                  data={dakuon} 
                  title="Dakuon" 
                  japaneseTitle="濁音"
                  description="Voiced variations of basic Katakana characters, marked with two dots (゛)"
                />
                <TableSection 
                  data={handakuon} 
                  title="Handakuon" 
                  japaneseTitle="半濁音"
                  description="Half-voiced variations of basic Katakana characters, marked with a small circle (゜)"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 