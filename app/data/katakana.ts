export const katakanaData = {
  basic: [
    // Vowels (あ行)
    { kana: 'ア', romaji: 'a', type: 'gojuon' },
    { kana: 'イ', romaji: 'i', type: 'gojuon' },
    { kana: 'ウ', romaji: 'u', type: 'gojuon' },
    { kana: 'エ', romaji: 'e', type: 'gojuon' },
    { kana: 'オ', romaji: 'o', type: 'gojuon' },
    
    // K Group (か行)
    { kana: 'カ', romaji: 'ka', type: 'gojuon' },
    { kana: 'キ', romaji: 'ki', type: 'gojuon' },
    { kana: 'ク', romaji: 'ku', type: 'gojuon' },
    { kana: 'ケ', romaji: 'ke', type: 'gojuon' },
    { kana: 'コ', romaji: 'ko', type: 'gojuon' },
    
    // S Group (さ行)
    { kana: 'サ', romaji: 'sa', type: 'gojuon' },
    { kana: 'シ', romaji: 'shi', type: 'gojuon' },
    { kana: 'ス', romaji: 'su', type: 'gojuon' },
    { kana: 'セ', romaji: 'se', type: 'gojuon' },
    { kana: 'ソ', romaji: 'so', type: 'gojuon' },
    
    // T Group (た行)
    { kana: 'タ', romaji: 'ta', type: 'gojuon' },
    { kana: 'チ', romaji: 'chi', type: 'gojuon' },
    { kana: 'ツ', romaji: 'tsu', type: 'gojuon' },
    { kana: 'テ', romaji: 'te', type: 'gojuon' },
    { kana: 'ト', romaji: 'to', type: 'gojuon' },
    
    // N Group (な行)
    { kana: 'ナ', romaji: 'na', type: 'gojuon' },
    { kana: 'ニ', romaji: 'ni', type: 'gojuon' },
    { kana: 'ヌ', romaji: 'nu', type: 'gojuon' },
    { kana: 'ネ', romaji: 'ne', type: 'gojuon' },
    { kana: 'ノ', romaji: 'no', type: 'gojuon' },
    
    // H Group (は行)
    { kana: 'ハ', romaji: 'ha', type: 'gojuon' },
    { kana: 'ヒ', romaji: 'hi', type: 'gojuon' },
    { kana: 'フ', romaji: 'fu', type: 'gojuon' },
    { kana: 'ヘ', romaji: 'he', type: 'gojuon' },
    { kana: 'ホ', romaji: 'ho', type: 'gojuon' },
    
    // M Group (ま行)
    { kana: 'マ', romaji: 'ma', type: 'gojuon' },
    { kana: 'ミ', romaji: 'mi', type: 'gojuon' },
    { kana: 'ム', romaji: 'mu', type: 'gojuon' },
    { kana: 'メ', romaji: 'me', type: 'gojuon' },
    { kana: 'モ', romaji: 'mo', type: 'gojuon' },
    
    // Y Group (や行)
    { kana: 'ヤ', romaji: 'ya', type: 'gojuon' },
    { kana: 'ユ', romaji: 'yu', type: 'gojuon' },
    { kana: 'ヨ', romaji: 'yo', type: 'gojuon' },
    
    // R Group (ら行)
    { kana: 'ラ', romaji: 'ra', type: 'gojuon' },
    { kana: 'リ', romaji: 'ri', type: 'gojuon' },
    { kana: 'ル', romaji: 'ru', type: 'gojuon' },
    { kana: 'レ', romaji: 're', type: 'gojuon' },
    { kana: 'ロ', romaji: 'ro', type: 'gojuon' },
    
    // W Group (わ行)
    { kana: 'ワ', romaji: 'wa', type: 'gojuon' },
    { kana: 'ヲ', romaji: 'wo', type: 'gojuon' },
    
    // N (ん)
    { kana: 'ン', romaji: 'n', type: 'gojuon' }
  ],
  
  lessons: [
    {
      id: 'vowels',
      title: 'Vowels',
      subtitle: '母音',
      characters: ['ア', 'イ', 'ウ', 'エ', 'オ'],
      content: 'Start with the five basic vowels in Katakana. These are the foundation of the writing system.'
    },
    {
      id: 'k-group',
      title: 'K-Group',
      subtitle: 'カ行',
      characters: ['カ', 'キ', 'ク', 'ケ', 'コ'],
      content: 'The K-group adds the "k" sound to each vowel.'
    },
    {
      id: 's-group',
      title: 'S-Group',
      subtitle: 'サ行',
      characters: ['サ', 'シ', 'ス', 'セ', 'ソ'],
      content: 'The S-group includes the special "shi" sound instead of "si".'
    },
    {
      id: 't-group',
      title: 'T-Group',
      subtitle: 'タ行',
      characters: ['タ', 'チ', 'ツ', 'テ', 'ト'],
      content: 'The T-group includes special sounds "chi" and "tsu".'
    },
    {
      id: 'n-group',
      title: 'N-Group',
      subtitle: 'ナ行',
      characters: ['ナ', 'ニ', 'ヌ', 'ネ', 'ノ'],
      content: 'The N-group adds the "n" sound to each vowel.'
    },
    {
      id: 'h-group',
      title: 'H-Group',
      subtitle: 'ハ行',
      characters: ['ハ', 'ヒ', 'フ', 'ヘ', 'ホ'],
      content: 'The H-group includes the special "fu" sound instead of "hu".'
    },
    {
      id: 'm-group',
      title: 'M-Group',
      subtitle: 'マ行',
      characters: ['マ', 'ミ', 'ム', 'メ', 'モ'],
      content: 'The M-group adds the "m" sound to each vowel.'
    },
    {
      id: 'y-group',
      title: 'Y-Group',
      subtitle: 'ヤ行',
      characters: ['ヤ', 'ユ', 'ヨ'],
      content: 'The Y-group has only three sounds: "ya", "yu", and "yo".'
    },
    {
      id: 'r-group',
      title: 'R-Group',
      subtitle: 'ラ行',
      characters: ['ラ', 'リ', 'ル', 'レ', 'ロ'],
      content: 'The R-group adds the "r" sound to each vowel.'
    },
    {
      id: 'w-n-group',
      title: 'W-Group & N',
      subtitle: 'ワ行とン',
      characters: ['ワ', 'ヲ', 'ン'],
      content: 'The W-group has "wa" and "wo", plus the special "n" sound.'
    }
  ]
}; 