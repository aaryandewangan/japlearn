'use client';

import React from 'react';
import { IoVolumeHigh } from "react-icons/io5";

interface AudioPlayerProps {
  text: string;
  size?: 'sm' | 'lg';
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ text, size = 'sm' }) => {
  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // Slightly slower for clarity
    speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={playSound}
      className={`${
        size === 'lg' 
          ? 'p-3 rounded-full' 
          : 'p-2 rounded-full'
      } bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-600`}
    >
      <IoVolumeHigh size={size === 'lg' ? 24 : 20} />
    </button>
  );
};

export default AudioPlayer; 