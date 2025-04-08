export const CATEGORIES = [
  {
    id: 'hiragana',
    name: 'Hiragana ひらがな',
    icon: 'あ',
    description: 'The foundational Japanese writing system used for native words, grammar, and pronunciation. Essential for beginning Japanese.'
  },
  {
    id: 'katakana',
    name: 'Katakana カタカナ',
    icon: 'ア',
    description: 'Angular Japanese script used for foreign loanwords, emphasis, and technical/scientific terms. Complements Hiragana.'
  },
  {
    id: 'basic-kanji',
    name: 'Basic Kanji 漢字',
    icon: '漢',
    description: 'Japanese writing system using adopted characters'
  },
  {
    id: 'grammar',
    name: 'Grammar 文法',
    icon: '文',
    description: 'Japanese sentence structure'
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary 語彙',
    icon: '語',
    description: 'Essential Japanese words'
  }
];

export const LESSONS_NEW = [
  // Hiragana Lessons
  {
    id: 'hiragana-what',
    title: 'What is Hiragana?',
    icon: 'あ',
    category: 'hiragana',
    description: 'One of the three Japanese writing systems, consisting of 46 basic characters representing syllable sounds. The most basic and essential script for Japanese learners.',
    level: 1
  },
  {
    id: 'hiragana-usage',
    title: 'Uses of Hiragana',
    icon: 'ひ',
    category: 'hiragana',
    description: 'Used for writing grammatical elements, native Japanese words, and as reading aids above kanji. The primary writing system for Japanese children and beginners.',
    level: 1
  },
  {
    id: 'hiragana-structure',
    title: 'How Hiragana Works',
    icon: 'ら',
    category: 'hiragana',
    description: 'Built from 5 vowels (a, i, u, e, o) and 40 consonant-vowel combinations. Includes basic characters, voiced variations (dakuon), and combined characters (yōon).',
    level: 1
  },
  {
    id: 'hiragana-path',
    title: 'Learning Path',
    icon: 'な',
    category: 'hiragana',
    description: 'Start with basic vowels, then consonant combinations, followed by voiced sounds and special combinations. Practice writing and reading to master Hiragana.',
    level: 1
  },

  // Katakana Lessons
  {
    id: 'katakana-what',
    title: 'What is Katakana?',
    icon: 'ア',
    category: 'katakana',
    description: 'Angular Japanese writing system used primarily for foreign words, scientific terms, and emphasis. Consists of 46 basic characters matching Hiragana sounds.',
    level: 1
  },
  {
    id: 'katakana-usage',
    title: 'Uses of Katakana',
    icon: 'カ',
    category: 'katakana',
    description: 'Used for foreign loanwords, company names, scientific terms, and emphasis in advertising. Essential for reading modern Japanese with its many borrowed words.',
    level: 1
  },
  {
    id: 'katakana-structure',
    title: 'How Katakana Works',
    icon: 'タ',
    category: 'katakana',
    description: 'Shares the same sound structure as Hiragana with 5 vowels and 40 consonant-vowel combinations. Includes special rules for adapting foreign sounds.',
    level: 1
  },
  {
    id: 'katakana-path',
    title: 'Learning Path',
    icon: 'ナ',
    category: 'katakana',
    description: 'Learn basic characters, practice with common loanwords, then master foreign sound adaptations. Focus on recognition in everyday Japanese materials.',
    level: 1
  },

  // Basic Kanji Lessons
  {
    id: 'kanji-what',
    title: 'Understanding Kanji',
    icon: '漢',
    category: 'basic-kanji',
    description: 'Chinese-derived characters used in Japanese writing. Each character can represent meaning and multiple pronunciations.',
    level: 2
  },
  {
    id: 'kanji-usage',
    title: 'Basic Kanji Applications',
    icon: '字',
    category: 'basic-kanji',
    description: 'Learn essential kanji for numbers, dates, time, and basic communication. Foundation for reading and writing Japanese.',
    level: 2
  },
  {
    id: 'kanji-structure',
    title: 'Kanji Components',
    icon: '部',
    category: 'basic-kanji',
    description: 'Understand radicals and common elements that make up kanji characters. Learn basic writing principles and stroke orders.',
    level: 2
  },
  {
    id: 'kanji-path',
    title: 'Learning Strategy',
    icon: '学',
    category: 'basic-kanji',
    description: 'Start with simple, frequent-use kanji. Progress through radicals, compounds, and readings. Regular practice with real-world examples.',
    level: 2
  },

  // Grammar Lessons
  {
    id: 'grammar-what',
    title: 'Japanese Grammar Basics',
    icon: '文',
    category: 'grammar',
    description: 'Introduction to Japanese sentence structure: Subject-Object-Verb order and basic particles. Foundation for forming Japanese sentences.',
    level: 2
  },
  {
    id: 'grammar-usage',
    title: 'Essential Grammar Points',
    icon: '法',
    category: 'grammar',
    description: 'Master fundamental particles, verb forms, and adjective usage. Learn how to construct basic Japanese sentences.',
    level: 2
  },
  {
    id: 'grammar-structure',
    title: 'Sentence Patterns',
    icon: '型',
    category: 'grammar',
    description: 'Learn common sentence patterns, polite vs. casual forms, and basic conjugation rules for verbs and adjectives.',
    level: 2
  },
  {
    id: 'grammar-path',
    title: 'Grammar Progression',
    icon: '道',
    category: 'grammar',
    description: 'Begin with basic particles and forms, advance to complex sentences. Practice with real conversations and writing exercises.',
    level: 2
  },

  // Vocabulary Lessons
  {
    id: 'vocab-what',
    title: 'Essential Vocabulary',
    icon: '語',
    category: 'vocabulary',
    description: 'Core Japanese vocabulary for everyday communication. Focus on high-frequency words and practical expressions.',
    level: 1
  },
  {
    id: 'vocab-usage',
    title: 'Practical Applications',
    icon: '実',
    category: 'vocabulary',
    description: 'Learn vocabulary for daily situations: greetings, shopping, dining, travel, and basic conversation.',
    level: 1
  },
  {
    id: 'vocab-structure',
    title: 'Word Building',
    icon: '造',
    category: 'vocabulary',
    description: 'Understand how Japanese words are formed, common prefixes and suffixes, and word relationships.',
    level: 1
  },
  {
    id: 'vocab-path',
    title: 'Vocabulary Growth',
    icon: '増',
    category: 'vocabulary',
    description: 'Start with basic greetings and numbers, expand to daily life vocabulary, then specific topics and formal language.',
    level: 1
  }
];