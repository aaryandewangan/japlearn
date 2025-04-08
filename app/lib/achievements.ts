export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  unlockedAt?: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🎯',
    condition: 'Complete 1 lesson'
  },
  {
    id: 'streak_7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    condition: '7 day streak'
  },
  {
    id: 'xp_1000',
    name: 'XP Master',
    description: 'Earn 1000 XP',
    icon: '⭐',
    condition: '1000 XP'
  },
  {
    id: 'perfect_lesson',
    name: 'Perfectionist',
    description: 'Complete a lesson with 100% accuracy',
    icon: '💯',
    condition: '100% accuracy in a lesson'
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Study after midnight',
    icon: '🦉',
    condition: 'Study between 12 AM and 4 AM'
  },
  {
    id: 'streak_30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day streak',
    icon: '🌟',
    condition: '30 day streak'
  },
  {
    id: 'vocab_master',
    name: 'Vocabulary Master',
    description: 'Learn 500 words',
    icon: '📚',
    condition: 'Learn 500 words'
  },
  {
    id: 'speed_demon',
    name: 'Speed Demon',
    description: 'Complete a lesson in under 2 minutes',
    icon: '⚡',
    condition: 'Complete lesson < 2min'
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Study before 6 AM',
    icon: '🌅',
    condition: 'Study before 6 AM'
  },
  {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    description: 'Study on both Saturday and Sunday',
    icon: '🎮',
    condition: 'Study on weekends'
  },
  {
    id: 'grammar_guru',
    name: 'Grammar Guru',
    description: 'Get 10 perfect grammar exercises',
    icon: '📝',
    condition: '10 perfect grammar'
  },
  {
    id: 'kanji_master',
    name: 'Kanji Master',
    description: 'Learn 100 kanji characters',
    icon: '漢',
    condition: 'Learn 100 kanji'
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Participate in 5 community discussions',
    icon: '🦋',
    condition: '5 discussions'
  },
  {
    id: 'helping_hand',
    name: 'Helping Hand',
    description: 'Help 3 other learners',
    icon: '🤝',
    condition: 'Help 3 learners'
  },
  {
    id: 'milestone_10k',
    name: 'Milestone: 10K',
    description: 'Earn 10,000 XP',
    icon: '🏆',
    condition: '10,000 XP'
  }
]; 