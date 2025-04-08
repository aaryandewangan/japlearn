'use client'
import { motion } from 'framer-motion';
import { Level } from '@/app/lib/levels';

interface LevelProgressProps {
  currentLevel: Level;
  progress: number;
  nextLevel?: Level;
}

export default function LevelProgress({ currentLevel, progress, nextLevel }: LevelProgressProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            {currentLevel.badge} Level {currentLevel.level}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {currentLevel.title}
          </p>
        </div>
        {nextLevel && (
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Next Level</p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {nextLevel.badge} {nextLevel.title}
            </p>
          </div>
        )}
      </div>
      
      <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500"
        />
      </div>
      
      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
        {progress.toFixed(1)}% to Level {nextLevel?.level || currentLevel.level}
      </div>
    </div>
  );
} 