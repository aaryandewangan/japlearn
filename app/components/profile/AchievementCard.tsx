'use client'
import { motion } from 'framer-motion';
import { Achievement } from '@/app/lib/achievements';

export default function AchievementCard({ achievement, unlocked }: { 
  achievement: Achievement;
  unlocked: boolean;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-xl ${
        unlocked 
          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
      }`}
    >
      <div className="text-3xl mb-2">{achievement.icon}</div>
      <h3 className="font-bold mb-1">{achievement.name}</h3>
      <p className="text-sm opacity-80">{achievement.description}</p>
      {unlocked && achievement.unlockedAt && (
        <p className="text-xs mt-2 opacity-60">
          Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
        </p>
      )}
    </motion.div>
  );
} 