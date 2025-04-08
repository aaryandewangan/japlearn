'use client'
import { useState, useCallback, useEffect } from 'react';
import { FiX, FiMaximize, FiVolume2, FiInfo } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// Remove print styles and keep only the media query hook
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

export default function HiraganaChart() {
  const [isOpen, setIsOpen] = useState(false);
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const gojuon = [
    { row: 'あ行', chars: [
      { kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, 
      { kana: 'う', romaji: 'u' }, { kana: 'え', romaji: 'e' }, 
      { kana: 'お', romaji: 'o' }
    ]},
    { row: 'か行', chars: [
      { kana: 'か', romaji: 'ka' }, { kana: 'き', romaji: 'ki' },
      { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' },
      { kana: 'こ', romaji: 'ko' }
    ]},
    { row: 'さ行', chars: [
      { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' },
      { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' },
      { kana: 'そ', romaji: 'so' }
    ]},
    { row: 'た行', chars: [
      { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' },
      { kana: 'つ', romaji: 'tsu' }, { kana: 'て', romaji: 'te' },
      { kana: 'と', romaji: 'to' }
    ]},
    { row: 'な行', chars: [
      { kana: 'な', romaji: 'na' }, { kana: 'に', romaji: 'ni' },
      { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' },
      { kana: 'の', romaji: 'no' }
    ]},
    { row: 'は行', chars: [
      { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' },
      { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' },
      { kana: 'ほ', romaji: 'ho' }
    ]},
    { row: 'ま行', chars: [
      { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' },
      { kana: 'む', romaji: 'mu' }, { kana: 'め', romaji: 'me' },
      { kana: 'も', romaji: 'mo' }
    ]},
    { row: 'や行', chars: [
      { kana: 'や', romaji: 'ya' }, { kana: 'ゆ', romaji: 'yu' },
      { kana: 'よ', romaji: 'yo' }
    ]},
    { row: 'ら行', chars: [
      { kana: 'ら', romaji: 'ra' }, { kana: 'り', romaji: 'ri' },
      { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' },
      { kana: 'ろ', romaji: 'ro' }
    ]},
    { row: 'わ行', chars: [
      { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' },
      { kana: 'ん', romaji: 'n' }
    ]}
  ];

  const dakuon = [
    { row: 'が行', chars: [
      { kana: 'が', romaji: 'ga' }, { kana: 'ぎ', romaji: 'gi' },
      { kana: 'ぐ', romaji: 'gu' }, { kana: 'げ', romaji: 'ge' },
      { kana: 'ご', romaji: 'go' }
    ]},
    { row: 'ざ行', chars: [
      { kana: 'ざ', romaji: 'za' }, { kana: 'じ', romaji: 'ji' },
      { kana: 'ず', romaji: 'zu' }, { kana: 'ぜ', romaji: 'ze' },
      { kana: 'ぞ', romaji: 'zo' }
    ]},
    { row: 'だ行', chars: [
      { kana: 'だ', romaji: 'da' }, { kana: 'ぢ', romaji: 'ji' },
      { kana: 'づ', romaji: 'zu' }, { kana: 'で', romaji: 'de' },
      { kana: 'ど', romaji: 'do' }
    ]},
    { row: 'ば行', chars: [
      { kana: 'ば', romaji: 'ba' }, { kana: 'び', romaji: 'bi' },
      { kana: 'ぶ', romaji: 'bu' }, { kana: 'べ', romaji: 'be' },
      { kana: 'ぼ', romaji: 'bo' }
    ]}
  ];

  const handakuon = [
    { row: 'ぱ行', chars: [
      { kana: 'ぱ', romaji: 'pa' }, { kana: 'ぴ', romaji: 'pi' },
      { kana: 'ぷ', romaji: 'pu' }, { kana: 'ぺ', romaji: 'pe' },
      { kana: 'ぽ', romaji: 'po' }
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

  // Add English translations for row headings
  const getEnglishRow = (japaneseRow: string) => {
    const translations: { [key: string]: string } = {
      'あ行': 'A-row (A-gyō)',
      'か行': 'K-row (Ka-gyō)',
      'さ行': 'S-row (Sa-gyō)',
      'た行': 'T-row (Ta-gyō)',
      'な行': 'N-row (Na-gyō)',
      'は行': 'H-row (Ha-gyō)',
      'ま行': 'M-row (Ma-gyō)',
      'や行': 'Y-row (Ya-gyō)',
      'ら行': 'R-row (Ra-gyō)',
      'わ行': 'W-row (Wa-gyō)',
      'が行': 'G-row (Ga-gyō)',
      'ざ行': 'Z-row (Za-gyō)',
      'だ行': 'D-row (Da-gyō)',
      'ば行': 'B-row (Ba-gyō)',
      'ぱ行': 'P-row (Pa-gyō)',
    };
    return translations[japaneseRow] || japaneseRow;
  };

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
      <div className="mt-8">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 
            text-white rounded-lg transition-all focus:outline-none focus:ring-2 
            focus:ring-purple-500 focus:ring-offset-2 shadow-lg"
          aria-label="Open Hiragana Chart"
        >
          <FiMaximize aria-hidden="true" />
          View Complete Hiragana Chart
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
                  Complete Hiragana Chart
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
                  description="Basic Hiragana characters arranged in the traditional 5×10 grid"
                />
                <TableSection 
                  data={dakuon} 
                  title="Dakuon" 
                  japaneseTitle="濁音"
                  description="Voiced variations of basic Hiragana characters, marked with two dots (゛)"
                />
                <TableSection 
                  data={handakuon} 
                  title="Handakuon" 
                  japaneseTitle="半濁音"
                  description="Half-voiced variations of basic Hiragana characters, marked with a small circle (゜)"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 