export const CATEGORIES = [
  {
    id: 'hiragana',
    label: 'Hiragana',
    icon: 'あ',
    count: 5
  },
  {
    id: 'katakana',
    label: 'Katakana',
    icon: 'ア',
    count: 4
  },
  {
    id: 'basic-kanji',
    label: 'Basic Kanji',
    icon: '漢',
    count: 3
  },
  {
    id: 'grammar',
    label: 'Grammar',
    icon: '文',
    count: 4
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    icon: '語',
    count: 5
  }
];

export const LESSONS_NEW = {
  hiragana: [
    {
      id: 'hiragana-basics',
      title: 'Basic Hiragana (あ行)',
      icon: 'あ',
      level: 1,
      progress: 100
    },
    {
      id: 'hiragana-ka',
      title: 'か行 Characters',
      icon: 'か',
      level: 1,
      progress: 75
    },
    {
      id: 'hiragana-sa',
      title: 'さ行 Characters',
      icon: 'さ',
      level: 1,
      progress: 50
    },
    {
      id: 'hiragana-ta',
      title: 'た行 Characters',
      icon: 'た',
      level: 1,
      progress: 25
    },
    {
      id: 'hiragana-review',
      title: 'Complete Review',
      icon: '✓',
      level: 1,
      progress: 0
    }
  ],
  katakana: [
    {
      id: 'katakana-basics',
      title: 'Basic Katakana (ア行)',
      icon: 'ア',
      level: 1,
      progress: 100
    },
    {
      id: 'katakana-ka',
      title: 'カ行 Characters',
      icon: 'カ',
      level: 1,
      progress: 80
    },
    {
      id: 'katakana-sa',
      title: 'サ行 Characters',
      icon: 'サ',
      level: 1,
      progress: 60
    },
    {
      id: 'katakana-practice',
      title: 'Loan Words Practice',
      icon: '🗣️',
      level: 2,
      progress: 30
    }
  ],
  'basic-kanji': [
    {
      id: 'numbers',
      title: 'Numbers and Counting',
      icon: '一',
      level: 2,
      progress: 40
    },
    {
      id: 'days',
      title: 'Days and Time',
      icon: '日',
      level: 2,
      progress: 20
    },
    {
      id: 'basic-nouns',
      title: 'Common Nouns',
      icon: '人',
      level: 2,
      progress: 0
    }
  ],
  grammar: [
    {
      id: 'particles',
      title: 'Basic Particles は・が・を',
      icon: 'は',
      level: 2,
      progress: 90
    },
    {
      id: 'verbs',
      title: 'Basic Verb Forms',
      icon: '動',
      level: 2,
      progress: 60
    },
    {
      id: 'adjectives',
      title: 'い and な Adjectives',
      icon: '形',
      level: 2,
      progress: 40
    },
    {
      id: 'sentence-structure',
      title: 'Basic Sentence Structure',
      icon: '文',
      level: 2,
      progress: 20
    }
  ],
  vocabulary: [
    {
      id: 'greetings',
      title: 'Greetings & Introductions',
      icon: '👋',
      level: 1,
      progress: 100
    },
    {
      id: 'daily-life',
      title: 'Daily Life Words',
      icon: '🌞',
      level: 1,
      progress: 75
    },
    {
      id: 'food',
      title: 'Food & Dining',
      icon: '🍱',
      level: 2,
      progress: 50
    },
    {
      id: 'transport',
      title: 'Transportation',
      icon: '🚉',
      level: 2,
      progress: 25
    },
    {
      id: 'weather',
      title: 'Weather & Seasons',
      icon: '🌤️',
      level: 2,
      progress: 0
    }
  ]
};