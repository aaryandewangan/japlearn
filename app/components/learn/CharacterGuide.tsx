'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoVolumeHigh, IoGrid, IoCheckmark, IoClose } from "react-icons/io5";

interface CharacterGuideProps {
  character: string;
  romaji: string;
  tips?: string[];
  commonMistakes?: string[];
  similarCharacters?: {
    char: string;
    romaji: string;
    difference: string;
  }[];
}

const CharacterGuide: React.FC<CharacterGuideProps> = ({
  character,
  romaji,
  tips,
  commonMistakes,
  similarCharacters
}) => {
  const [showGrid, setShowGrid] = useState(false);

  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(character);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Character Display */}
      <div className="relative">
        <div className={`aspect-square bg-white dark:bg-gray-800 rounded-xl p-8 flex items-center justify-center border border-gray-200 dark:border-gray-700
          ${showGrid ? 'bg-[url("/grid-pattern.svg")] bg-center bg-contain' : ''}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-8xl font-japanese text-gray-900 dark:text-white"
          >
            {character}
          </motion.div>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
          >
            <IoGrid size={20} />
          </button>
          <button
            onClick={playSound}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
          >
            <IoVolumeHigh size={20} />
          </button>
        </div>
      </div>

      {/* Writing Tips */}
      {tips && tips.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Writing Tips
          </h3>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <IoCheckmark className="flex-shrink-0 mt-1 text-green-500" size={18} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Common Mistakes */}
      {commonMistakes && commonMistakes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Common Mistakes to Avoid
          </h3>
          <ul className="space-y-3">
            {commonMistakes.map((mistake, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <IoClose className="flex-shrink-0 mt-1 text-red-500" size={18} />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Similar Characters */}
      {Array.isArray(similarCharacters) && similarCharacters.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Similar Characters
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {similarCharacters.map((similar, index) => (
              <div 
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-japanese text-gray-900 dark:text-white">
                    {similar.char}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({similar.romaji})
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {similar.difference}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterGuide; 