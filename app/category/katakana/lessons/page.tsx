'use client'
import { useState, useEffect, useCallback } from 'react';
import Header from '@/app/components/layout/Header';
import { FiVolume2, FiPlay, FiCheck, FiArrowRight, FiBookOpen, FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BrowserWarningDialog from '@/app/components/BrowserWarningDialog';
import KatakanaChart from '@/app/components/KatakanaChart';

interface KatakanaLesson {
  id: string;
  title: string;
  titleJp: string;
  characters: {
    kana: string;
    romaji: string;
    strokeOrder: string;
    examples: {
      word: string;
      reading: string;
      meaning: string;
    }[];
  }[];
  description: string;
}

export default function KatakanaLessons() {
  // First define lessons array
  const lessons: KatakanaLesson[] = [
    {
      id: 'vowels',
      title: 'Lesson 1: Vowels',
      titleJp: '母音 (Boin)',
      description: 'Start with the five basic vowels, the foundation of Katakana.',
      characters: [
        {
          kana: 'ア',
          romaji: 'a',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/a.gif',
          examples: [
            { word: 'アメリカ', reading: 'amerika', meaning: 'America' },
            { word: 'アニメ', reading: 'anime', meaning: 'animation' }
          ]
        },
        {
          kana: 'イ',
          romaji: 'i',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/i.gif',
          examples: [
            { word: 'イヌ', reading: 'inu', meaning: 'dog' },
            { word: 'イシ', reading: 'ishi', meaning: 'stone' }
          ]
        },
        {
          kana: 'ウ',
          romaji: 'u',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/u.gif',
          examples: [
            { word: 'ウミ', reading: 'umi', meaning: 'sea' },
            { word: 'ウタ', reading: 'uta', meaning: 'song' }
          ]
        },
        {
          kana: 'エ',
          romaji: 'e',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/e.gif',
          examples: [
            { word: 'エキ', reading: 'eki', meaning: 'station' },
            { word: 'エン', reading: 'en', meaning: 'yen' }
          ]
        },
        {
          kana: 'オ',
          romaji: 'o',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/o.gif',
          examples: [
            { word: 'オト', reading: 'oto', meaning: 'sound' },
            { word: 'オカ', reading: 'oka', meaning: 'hill' }
          ]
        }
      ]
    },
    {
      id: 'k-group',
      title: 'Lesson 2: K-Group',
      titleJp: 'か行 (Ka-gyō)',
      description: 'Learn the K-group characters.',
      characters: [
        {
          kana: 'カ',
          romaji: 'ka',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ka.gif',
          examples: [
            { word: 'カイ', reading: 'kai', meaning: 'shell' },
            { word: 'カサ', reading: 'kasa', meaning: 'umbrella' }
          ]
        },
        {
          kana: 'キ',
          romaji: 'ki',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ki.gif',
          examples: [
            { word: 'キク', reading: 'kiku', meaning: 'chrysanthemum' },
            { word: 'キテ', reading: 'kite', meaning: 'come' }
          ]
        },
        {
          kana: 'ク',
          romaji: 'ku',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ku.gif',
          examples: [
            { word: 'クニ', reading: 'kuni', meaning: 'country' },
            { word: 'クモ', reading: 'kumo', meaning: 'cloud' }
          ]
        },
        {
          kana: 'ケ',
          romaji: 'ke',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ke.gif',
          examples: [
            { word: 'ケン', reading: 'ken', meaning: 'prefecture' },
            { word: 'ケサ', reading: 'kesa', meaning: 'this morning' }
          ]
        },
        {
          kana: 'コ',
          romaji: 'ko',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ko.gif',
          examples: [
            { word: 'コト', reading: 'koto', meaning: 'thing' },
            { word: 'ココ', reading: 'koko', meaning: 'here' }
          ]
        }
      ]
    },
    {
      id: 's-group',
      title: 'Lesson 3: S-Group',
      titleJp: 'さ行 (Sa-gyō)',
      description: 'Learn the S-group characters.',
      characters: [
        {
          kana: 'サ',
          romaji: 'sa',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/sa.gif',
          examples: [
            { word: 'サケ', reading: 'sake', meaning: 'salmon/sake' },
            { word: 'サル', reading: 'saru', meaning: 'monkey' }
          ]
        },
        {
          kana: 'シ',
          romaji: 'shi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/shi.gif',
          examples: [
            { word: 'シマ', reading: 'shima', meaning: 'island' },
            { word: 'スシ', reading: 'sushi', meaning: 'sushi' }
          ]
        },
        {
          kana: 'ス',
          romaji: 'su',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/su.gif',
          examples: [
            { word: 'スキ', reading: 'suki', meaning: 'like' },
            { word: 'スシ', reading: 'sushi', meaning: 'sushi' }
          ]
        },
        {
          kana: 'セ',
          romaji: 'se',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/se.gif',
          examples: [
            { word: 'センセイ', reading: 'sensei', meaning: 'teacher' },
            { word: 'セカイ', reading: 'sekai', meaning: 'world' }
          ]
        },
        {
          kana: 'ソ',
          romaji: 'so',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/so.gif',
          examples: [
            { word: 'ソラ', reading: 'sora', meaning: 'sky' },
            { word: 'ソト', reading: 'soto', meaning: 'outside' }
          ]
        }
      ]
    },
    {
      id: 't-group',
      title: 'Lesson 4: T-Group',
      titleJp: 'た行 (Ta-gyō)',
      description: 'Learn the T-group characters.',
      characters: [
        {
          kana: 'タ',
          romaji: 'ta',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ta.gif',
          examples: [
            { word: 'タコ', reading: 'tako', meaning: 'octopus' },
            { word: 'タベル', reading: 'taberu', meaning: 'to eat' }
          ]
        },
        {
          kana: 'チ',
          romaji: 'chi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/chi.gif',
          examples: [
            { word: 'チカラ', reading: 'chikara', meaning: 'power' },
            { word: 'チズ', reading: 'chizu', meaning: 'map' }
          ]
        },
        {
          kana: 'ツ',
          romaji: 'tsu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/tsu.gif',
          examples: [
            { word: 'ツキ', reading: 'tsuki', meaning: 'moon' },
            { word: 'ツケ', reading: 'tsukue', meaning: 'desk' }
          ]
        },
        {
          kana: 'テ',
          romaji: 'te',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/te.gif',
          examples: [
            { word: 'テガミ', reading: 'tegami', meaning: 'letter' },
            { word: 'テラ', reading: 'tera', meaning: 'temple' }
          ]
        },
        {
          kana: 'ト',
          romaji: 'to',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/to.gif',
          examples: [
            { word: 'トリ', reading: 'tori', meaning: 'bird' },
            { word: 'トケイ', reading: 'tokei', meaning: 'clock' }
          ]
        }
      ]
    },
    {
      id: 'n-group',
      title: 'Lesson 5: N-Group',
      titleJp: 'な行 (Na-gyō)',
      description: 'Learn the N-group characters.',
      characters: [
        {
          kana: 'ナ',
          romaji: 'na',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/na.gif',
          examples: [
            { word: 'ナツ', reading: 'natsu', meaning: 'summer' },
            { word: 'ナカ', reading: 'naka', meaning: 'inside/relationship' }
          ]
        },
        {
          kana: 'ニ',
          romaji: 'ni',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ni.gif',
          examples: [
            { word: 'ニク', reading: 'niku', meaning: 'meat' },
            { word: 'ニワ', reading: 'niwa', meaning: 'garden' }
          ]
        },
        {
          kana: 'ヌ',
          romaji: 'nu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/nu.gif',
          examples: [
            { word: 'ヌマ', reading: 'numa', meaning: 'swamp' },
            { word: 'ヌノ', reading: 'nuno', meaning: 'cloth' }
          ]
        },
        {
          kana: 'ネ',
          romaji: 'ne',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ne.gif',
          examples: [
            { word: 'ネコ', reading: 'neko', meaning: 'cat' },
            { word: 'ネツ', reading: 'netsu', meaning: 'fever' }
          ]
        },
        {
          kana: 'ノ',
          romaji: 'no',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/no.gif',
          examples: [
            { word: 'ノミ', reading: 'nomi', meaning: 'drink' },
            { word: 'ノリ', reading: 'nori', meaning: 'seaweed' }
          ]
        }
      ]
    },
    {
      id: 'h-group',
      title: 'Lesson 6: H-Group',
      titleJp: 'は行 (Ha-gyō)',
      description: 'Learn the H-group characters.',
      characters: [
        {
          kana: 'ハ',
          romaji: 'ha',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ha.gif',
          examples: [
            { word: 'ハナ', reading: 'hana', meaning: 'flower' },
            { word: 'ハシ', reading: 'hashi', meaning: 'chopsticks/bridge' }
          ]
        },
        {
          kana: 'ヒ',
          romaji: 'hi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/hi.gif',
          examples: [
            { word: 'ヒト', reading: 'hito', meaning: 'person' },
            { word: 'ヒル', reading: 'hiru', meaning: 'afternoon' }
          ]
        },
        {
          kana: 'フ',
          romaji: 'fu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/fu.gif',
          examples: [
            { word: 'フユ', reading: 'fuyu', meaning: 'winter' },
            { word: 'フネ', reading: 'fune', meaning: 'ship' }
          ]
        },
        {
          kana: 'ヘ',
          romaji: 'he',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/he.gif',
          examples: [
            { word: 'ヘヤ', reading: 'heya', meaning: 'room' },
            { word: 'ヘビ', reading: 'hebi', meaning: 'snake' }
          ]
        },
        {
          kana: 'ホ',
          romaji: 'ho',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ho.gif',
          examples: [
            { word: 'ホシ', reading: 'hoshi', meaning: 'star' },
            { word: 'ホン', reading: 'hon', meaning: 'book' }
          ]
        }
      ]
    },
    {
      id: 'm-group',
      title: 'Lesson 7: M-Group',
      titleJp: 'ま行 (Ma-gyō)',
      description: 'Learn the M-group characters.',
      characters: [
        {
          kana: 'マ',
          romaji: 'ma',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ma.gif',
          examples: [
            { word: 'マチ', reading: 'machi', meaning: 'town/city' },
            { word: 'マド', reading: 'mado', meaning: 'window' }
          ]
        },
        {
          kana: 'ミ',
          romaji: 'mi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/mi.gif',
          examples: [
            { word: 'ミズ', reading: 'mizu', meaning: 'water' },
            { word: 'ミミ', reading: 'mimi', meaning: 'ear' }
          ]
        },
        {
          kana: 'ム',
          romaji: 'mu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/mu.gif',
          examples: [
            { word: 'ムシ', reading: 'mushi', meaning: 'insect' },
            { word: 'ムラ', reading: 'mura', meaning: 'village' }
          ]
        },
        {
          kana: 'メ',
          romaji: 'me',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/me.gif',
          examples: [
            { word: 'メガネ', reading: 'megane', meaning: 'glasses' },
            { word: 'アメ', reading: 'ame', meaning: 'rain' }
          ]
        },
        {
          kana: 'モ',
          romaji: 'mo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/mo.gif',
          examples: [
            { word: 'モノ', reading: 'mono', meaning: 'thing' },
            { word: 'モリ', reading: 'mori', meaning: 'forest' }
          ]
        }
      ]
    },
    {
      id: 'y-group',
      title: 'Lesson 8: Y-Group',
      titleJp: 'や行 (Ya-gyō)',
      description: 'Learn the Y-group characters.',
      characters: [
        {
          kana: 'ヤ',
          romaji: 'ya',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ya.gif',
          examples: [
            { word: 'ヤマ', reading: 'yama', meaning: 'mountain' },
            { word: 'ヤサイ', reading: 'yasai', meaning: 'vegetable' }
          ]
        },
        {
          kana: 'ユ',
          romaji: 'yu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/yu.gif',
          examples: [
            { word: 'ユキ', reading: 'yuki', meaning: 'snow' },
            { word: 'ユビ', reading: 'yubi', meaning: 'finger' }
          ]
        },
        {
          kana: 'ヨ',
          romaji: 'yo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/yo.gif',
          examples: [
            { word: 'ヨル', reading: 'yoru', meaning: 'night' },
            { word: 'ヨム', reading: 'yomu', meaning: 'to read' }
          ]
        }
      ]
    },
    {
      id: 'r-group',
      title: 'Lesson 9: R-Group',
      titleJp: 'ら行 (Ra-gyō)',
      description: 'Learn the R-group characters.',
      characters: [
        {
          kana: 'ラ',
          romaji: 'ra',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ra.gif',
          examples: [
            { word: 'ラク', reading: 'raku', meaning: 'comfortable' },
            { word: 'サクラ', reading: 'sakura', meaning: 'cherry blossom' }
          ]
        },
        {
          kana: 'リ',
          romaji: 'ri',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ri.gif',
          examples: [
            { word: 'リンゴ', reading: 'ringo', meaning: 'apple' },
            { word: 'トリ', reading: 'tori', meaning: 'bird' }
          ]
        },
        {
          kana: 'ル',
          romaji: 'ru',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ru.gif',
          examples: [
            { word: 'ルス', reading: 'rusu', meaning: 'absence' },
            { word: 'フル', reading: 'furu', meaning: 'to fall (rain/snow)' }
          ]
        },
        {
          kana: 'レ',
          romaji: 're',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/re.gif',
          examples: [
            { word: 'レキシ', reading: 'rekishi', meaning: 'history' },
            { word: 'ソレ', reading: 'sore', meaning: 'that' }
          ]
        },
        {
          kana: 'ロ',
          romaji: 'ro',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ro.gif',
          examples: [
            { word: 'ロク', reading: 'roku', meaning: 'six' },
            { word: 'コロ', reading: 'koro', meaning: 'time/about' }
          ]
        }
      ]
    },
    {
      id: 'w-group',
      title: 'Lesson 10: W-Group',
      titleJp: 'わ行 (Wa-gyō)',
      description: 'Learn the W-group characters.',
      characters: [
        {
          kana: 'ワ',
          romaji: 'wa',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/wa.gif',
          examples: [
            { word: 'ワタシ', reading: 'watashi', meaning: 'I/me' },
            { word: 'カワ', reading: 'kawa', meaning: 'river' }
          ]
        },
        {
          kana: 'ヲ',
          romaji: 'wo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/wo.gif',
          examples: [
            { word: 'ヲ', reading: 'wo', meaning: 'object particle' },
            { word: 'ホンヲ', reading: 'hon wo', meaning: 'book (as object)' }
          ]
        }
      ]
    },
    {
      id: 'n',
      title: 'Lesson 11: N',
      titleJp: 'ン (N)',
      description: 'Learn the N character, which always comes at the end of a syllable.',
      characters: [
        {
          kana: 'ン',
          romaji: 'n',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/n.gif',
          examples: [
            { word: 'ニホン', reading: 'nihon', meaning: 'Japan' },
            { word: 'センセイ', reading: 'sensei', meaning: 'teacher' }
          ]
        }
      ]
    }
  ];

  // Then define dakuonLessons array
  const dakuonLessons: KatakanaLesson[] = [ 
    {
      id: 'g-group',
      title: 'Dakuon: G-Group',
      titleJp: 'が行 (Ga-gyō)',
      description: 'Learn the G-group voiced sounds (か → が).',
      characters: [
        {
          kana: 'ガ',
          romaji: 'ga',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ga.gif',
          examples: [
            { word: 'ガッコウ', reading: 'gakkou', meaning: 'school' },
            { word: 'ガンバル', reading: 'ganbaru', meaning: 'to do one\'s best' }
          ]
        },
        {
          kana: 'ギ',
          romaji: 'gi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/gi.gif',
          examples: [
            { word: 'ギンコウ', reading: 'ginkou', meaning: 'bank' },
            { word: 'カギ', reading: 'kagi', meaning: 'key' }
          ]
        },
        {
          kana: 'グ',
          romaji: 'gu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/gu.gif',
          examples: [
            { word: 'グンタイ', reading: 'guntai', meaning: 'army' },
            { word: 'モグ', reading: 'mogu', meaning: 'to munch' }
          ]
        },
        {
          kana: 'ゲ',
          romaji: 'ge',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ge.gif',
          examples: [
            { word: 'ゲンキ', reading: 'genki', meaning: 'healthy/energetic' },
            { word: 'アゲル', reading: 'ageru', meaning: 'to give' }
          ]
        },
        {
          kana: 'ゴ',
          romaji: 'go',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/go.gif',
          examples: [
            { word: 'ゴハン', reading: 'gohan', meaning: 'rice/meal' },
            { word: 'ゴメン', reading: 'gomen', meaning: 'sorry' }
          ]
        }
      ]
    },
    {
      id: 'ジグル',
      title: 'Dakuon: Z-Group',
      titleJp: 'ざ行 (Za-gyō)',
      description: 'Learn the Z-group voiced sounds (さ → ざ).',
      characters: [
        {
          kana: 'ザ',
          romaji: 'za',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/za.gif',
          examples: [
            { word: 'ザッシ', reading: 'zasshi', meaning: 'magazine' },
            { word: 'チズ', reading: 'chizu', meaning: 'map' }
          ]
        },
        {
          kana: 'ジ',
          romaji: 'ji',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ji.gif',
          examples: [
            { word: 'ジカン', reading: 'jikan', meaning: 'time' },
            { word: 'モジ', reading: 'moji', meaning: 'character/letter' }
          ]
        },
        {
          kana: 'ズ',
          romaji: 'zu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/zu.gif',
          examples: [
            { word: 'ズット', reading: 'zutto', meaning: 'always' },
            { word: 'ミズ', reading: 'mizu', meaning: 'water' }
          ]
        },
        {
          kana: 'ゼ',
          romaji: 'ze',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ze.gif',
          examples: [
            { word: 'ゼンブ', reading: 'zenbu', meaning: 'all/everything' },
            { word: 'カゼ', reading: 'kaze', meaning: 'wind/cold' }
          ]
        },
        {
          kana: 'ゾ',
          romaji: 'zo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/zo.gif',
          examples: [
            { word: 'ゾウ', reading: 'zou', meaning: 'elephant' },
            { word: 'ハナゾノ', reading: 'hanazono', meaning: 'flower garden' }
          ]
        }
      ]
    },
    {
      id: 'ダグル',
      title: 'Dakuon: D-Group',
      titleJp: 'だ行 (Da-gyō)',
      description: 'Learn the D-group voiced sounds (た → だ).',
      characters: [
        {
          kana: 'ダ',
          romaji: 'da',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/da.gif',
          examples: [
            { word: 'ダイガク', reading: 'daigaku', meaning: 'university' },
            { word: 'デンワ', reading: 'denwa', meaning: 'telephone' }
          ]
        },
        {
          kana: 'ヂ',
          romaji: 'ji',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/di.gif',
          examples: [
            { word: 'ハナジ', reading: 'hanaji', meaning: 'nosebleed' },
            { word: 'チジム', reading: 'chijimu', meaning: 'to shrink' }
          ]
        },
        {
          kana: 'ヅ',
          romaji: 'zu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/du.gif',
          examples: [
            { word: 'ツズク', reading: 'tsuzuku', meaning: 'to continue' },
            { word: 'ミカズキ', reading: 'mikazuki', meaning: 'crescent moon' }
          ]
        },
        {
          kana: 'デ',
          romaji: 'de',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/de.gif',
          examples: [
            { word: 'デンシャ', reading: 'densha', meaning: 'train' },
            { word: 'ウデ', reading: 'ude', meaning: 'arm' }
          ]
        },
        {
          kana: 'ド',
          romaji: 'do',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/do.gif',
          examples: [
            { word: 'ドウブツ', reading: 'doubutsu', meaning: 'animal' },
            { word: 'マド', reading: 'mado', meaning: 'window' }
          ]
        }
      ]
    },
    {
      id: 'バグル',
      title: 'Dakuon: B-Group',
      titleJp: 'ば行 (Ba-gyō)',
      description: 'Learn the B-group voiced sounds (は → ば).',
      characters: [
        {
          kana: 'バンゴハン',
          romaji: 'bangohan',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/ba.gif',
          examples: [
            { word: 'バンゴハン', reading: 'bangohan', meaning: 'dinner' },
            { word: 'タバコ', reading: 'tabako', meaning: 'cigarette' }
          ]
        },
        {
          kana: 'ビョウキ',
          romaji: 'byouki',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/bi.gif',
          examples: [
            { word: 'ビョウキ', reading: 'byouki', meaning: 'illness' },
            { word: 'エンピツ', reading: 'enpitsu', meaning: 'pencil' }
          ]
        },
        {
          kana: 'ブ',
          romaji: 'bu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/bu.gif',
          examples: [
            { word: 'ブンポウ', reading: 'bunpou', meaning: 'grammar' },
            { word: 'テブクロ', reading: 'tebukuro', meaning: 'gloves' }
          ]
        },
        {
          kana: 'ベンキョウ',
          romaji: 'benkyou',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/be.gif',
          examples: [
            { word: 'ベンキョウ', reading: 'benkyou', meaning: 'study' },
            { word: 'ナベ', reading: 'nabe', meaning: 'pot' }
          ]
        },
        {
          kana: 'ボウシ',
          romaji: 'boushi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/bo.gif',
          examples: [
            { word: 'ボウシ', reading: 'boushi', meaning: 'hat' },
            { word: 'タンボ', reading: 'tanbo', meaning: 'rice field' }
          ]
        }
      ]
    }
  ];

  // Add this to your lessonGroups array
  const handakuonLessons: KatakanaLesson[] = [
    {
      id: 'パグル',
      title: 'Handakuon: P-Group',
      titleJp: 'ぱ行 (Pa-gyō)',
      description: 'Learn the P-group half-voiced sounds (は → ぱ).',
      characters: [
        {
          kana: 'パン',
          romaji: 'pan',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/pa.gif',
          examples: [
            { word: 'パン', reading: 'pan', meaning: 'bread' },
            { word: 'パチパチ', reading: 'pachipachi', meaning: 'crackling/popping' }
          ]
        },
        {
          kana: 'ピ',
          romaji: 'pi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/pi.gif',
          examples: [
            { word: 'ピカピカ', reading: 'pikapika', meaning: 'sparkly/shiny' },
            { word: 'ピッタリ', reading: 'pittari', meaning: 'perfect fit' }
          ]
        },
        {
          kana: 'プ',
          romaji: 'pu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/pu.gif',
          examples: [
            { word: 'プリン', reading: 'purin', meaning: 'pudding' },
            { word: 'プラス', reading: 'purasu', meaning: 'plus' }
          ]
        },
        {
          kana: 'ペン',
          romaji: 'pen',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/pe.gif',
          examples: [
            { word: 'ペン', reading: 'pen', meaning: 'pen' },
            { word: 'ペラペラ', reading: 'perapera', meaning: 'fluent' }
          ]
        },
        {
          kana: 'ポ',
          romaji: 'po',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/katakana/po.gif',
          examples: [
            { word: 'ポケットポケット', reading: 'poketto poketto', meaning: 'pocket' },
            { word: 'ポイ', reading: 'poi', meaning: 'like/similar to' }
          ]
        }
      ]
    }
  ];

  // Add this new array after handakuonLessons
  const combinationLessons: KatakanaLesson[] = [
    {
      id: 'カコンビナション',
      title: 'Combinations: K-Group',
      titleJp: 'か行の拗音',
      description: 'Learn the contracted sounds of the K-group.',
      characters: [
        {
          kana: 'キャ',
          romaji: 'kya',
          strokeOrder: '',
          examples: [
            { word: 'キャク', reading: 'kyaku', meaning: 'guest' },
            { word: 'キャンセル', reading: 'kyanseru', meaning: 'cancel' }
          ]
        },
        {
          kana: 'キュ',
          romaji: 'kyu',
          strokeOrder: '',
          examples: [
            { word: 'キュリ', reading: 'kyuuri', meaning: 'cucumber' },
            { word: 'キュウ', reading: 'kyuu', meaning: 'nine' }
          ]
        },
        {
          kana: 'キョ',
          romaji: 'kyo',
          strokeOrder: '',
          examples: [
            { word: 'キョウ', reading: 'kyou', meaning: 'today' },
            { word: 'キョウシツ', reading: 'kyoushitsu', meaning: 'classroom' }
          ]
        }
      ]
    },
    {
      id: 'ガコンビナション',
      title: 'Combinations: G-Group',
      titleJp: 'が行の拗音',
      description: 'Learn the contracted sounds of the G-group.',
      characters: [
        {
          kana: 'ギャ',
          romaji: 'gya',
          strokeOrder: '',
          examples: [
            { word: 'ギャク', reading: 'gyaku', meaning: 'opposite' },
            { word: 'ギャクテン', reading: 'gyakuten', meaning: 'reversal' }
          ]
        },
        {
          kana: 'ギュ',
          romaji: 'gyu',
          strokeOrder: '',
          examples: [
            { word: 'ギュウニク', reading: 'gyuuniku', meaning: 'beef' },
            { word: 'ギュウニュウ', reading: 'gyuunyuu', meaning: 'milk' }
          ]
        },
        {
          kana: 'ギョ',
          romaji: 'gyo',
          strokeOrder: '',
          examples: [
            { word: 'ギョウザ', reading: 'gyouza', meaning: 'dumpling' },
            { word: 'ギョウム', reading: 'gyoumu', meaning: 'business' }
          ]
        }
      ]
    },
    {
      id: 'サコンビナション',
      title: 'Combinations: S-Group',
      titleJp: 'さ行の拗音',
      description: 'Learn the contracted sounds of the S-group.',
      characters: [
        {
          kana: 'シャ',
          romaji: 'sha',
          strokeOrder: '',
          examples: [
            { word: 'シャシン', reading: 'shashin', meaning: 'photograph' },
            { word: 'シャベル', reading: 'shaberu', meaning: 'to chat' }
          ]
        },
        {
          kana: 'シュ',
          romaji: 'shu',
          strokeOrder: '',
          examples: [
            { word: 'シュミ', reading: 'shumi', meaning: 'hobby' },
            { word: 'シュクダイ', reading: 'shukudai', meaning: 'homework' }
          ]
        },
        {
          kana: 'ショ',
          romaji: 'sho',
          strokeOrder: '',
          examples: [
            { word: 'ショコジ', reading: 'shokuji', meaning: 'meal' },
            { word: 'ショウユ', reading: 'shouyu', meaning: 'soy sauce' }
          ]
        }
      ]
    },
    {
      id: 'ジコンビナション',
      title: 'Combinations: J-Group',
      titleJp: 'じ行の拗音',
      description: 'Learn the contracted sounds of the J-group.',
      characters: [
        {
          kana: 'ジャ',
          romaji: 'ja',
          strokeOrder: '',
          examples: [
            { word: 'ジャア', reading: 'jaa', meaning: 'well then' },
            { word: 'オチャ', reading: 'ocha', meaning: 'tea' }
          ]
        },
        {
          kana: 'ジュ',
          romaji: 'ju',
          strokeOrder: '',
          examples: [
            { word: 'ジュギョウ', reading: 'jugyou', meaning: 'class' },
            { word: 'ジュウ', reading: 'juu', meaning: 'ten' }
          ]
        },
        {
          kana: 'ジョ',
          romaji: 'jo',
          strokeOrder: '',
          examples: [
            { word: 'ジョウズ', reading: 'jouzu', meaning: 'skilled' },
            { word: 'ジョウホウ', reading: 'jouhou', meaning: 'information' }
          ]
        }
      ]
    },
    {
      id: 'チコンビナション',
      title: 'Combinations: Ch-Group',
      titleJp: 'ち行の拗音',
      description: 'Learn the contracted sounds of the Ch-group.',
      characters: [
        {
          kana: 'チャ',
          romaji: 'cha',
          strokeOrder: '',
          examples: [
            { word: 'チャウン', reading: 'chawan', meaning: 'rice bowl' },
            { word: 'チャイロ', reading: 'chairo', meaning: 'brown' }
          ]
        },
        {
          kana: 'チュ',
          romaji: 'chu',
          strokeOrder: '',
          examples: [
            { word: 'チュイ', reading: 'chuui', meaning: 'attention' },
            { word: 'チュグク', reading: 'chuugoku', meaning: 'China' }
          ]
        },
        {
          kana: 'チョ',
          romaji: 'cho',
          strokeOrder: '',
          examples: [
            { word: 'チョット', reading: 'chotto', meaning: 'a little' },
            { word: 'チョウチョ', reading: 'choucho', meaning: 'butterfly' }
          ]
        }
      ]
    },
    {
      id: 'ニコンビナション',
      title: 'Combinations: N-Group',
      titleJp: 'に行の拗音',
      description: 'Learn the contracted sounds of the N-group.',
      characters: [
        {
          kana: 'ニャ',
          romaji: 'nya',
          strokeOrder: '',
          examples: [
            { word: 'ニャン', reading: 'nyan', meaning: 'meow' },
            { word: 'ニャンコ', reading: 'nyanko', meaning: 'kitty' }
          ]
        },
        {
          kana: 'ニュ',
          romaji: 'nyu',
          strokeOrder: '',
          examples: [
            { word: 'ニュウガク', reading: 'nyuugaku', meaning: 'school admission' },
            { word: 'ニュス', reading: 'nyuusu', meaning: 'news' }
          ]
        },
        {
          kana: 'ニョ',
          romaji: 'nyo',
          strokeOrder: '',
          examples: [
            { word: 'ニョウ', reading: 'nyou', meaning: 'urine' },
            { word: 'カニョウ', reading: 'kanyou', meaning: 'inclusion' }
          ]
        }
      ]
    },
    {
      id: 'ヒコンビナション',
      title: 'Combinations: H-Group',
      titleJp: 'ひ行の拗音',
      description: 'Learn the contracted sounds of the H-group.',
      characters: [
        {
          kana: 'ヒャ',
          romaji: 'hya',
          strokeOrder: '',
          examples: [
            { word: 'ヒャク', reading: 'hyaku', meaning: 'hundred' },
            { word: 'ヒャクエン', reading: 'hyakuen', meaning: '100 yen' }
          ]
        },
        {
          kana: 'ヒュ',
          romaji: 'hyu',
          strokeOrder: '',
          examples: [
            { word: 'ヒュウガ', reading: 'hyuuga', meaning: 'Hyuga (place name)' },
            { word: 'ヒュウ', reading: 'hyuu', meaning: 'whoosh (sound)' }
          ]
        },
        {
          kana: 'ヒョ',
          romaji: 'hyo',
          strokeOrder: '',
          examples: [
            { word: 'ヒョウ', reading: 'hyou', meaning: 'chart' },
            { word: 'ヒョウキ', reading: 'hyouki', meaning: 'notation' }
          ]
        }
      ]
    },
    {
      id: 'ビコンビナション',
      title: 'Combinations: B-Group',
      titleJp: 'び行の拗音',
      description: 'Learn the contracted sounds of the B-group.',
      characters: [
        {
          kana: 'ビャ',
          romaji: 'bya',
          strokeOrder: '',
          examples: [
            { word: 'ビャクヤ', reading: 'byakuya', meaning: 'midnight' },
            { word: 'ビャッコ', reading: 'byakko', meaning: 'white fox' }
          ]
        },
        {
          kana: 'ビュ',
          romaji: 'byu',
          strokeOrder: '',
          examples: [
            { word: 'ビュウ', reading: 'byuu', meaning: 'whoosh' },
            { word: 'ビュウビュウ', reading: 'byuubyuu', meaning: 'whistling sound' }
          ]
        },
        {
          kana: 'ビョ',
          romaji: 'byo',
          strokeOrder: '',
          examples: [
            { word: 'ビョウキ', reading: 'byouki', meaning: 'illness' },
            { word: 'ビョウイン', reading: 'byouin', meaning: 'hospital' }
          ]
        }
      ]
    },
    {
      id: 'ピコンビナション',
      title: 'Combinations: P-Group',
      titleJp: 'ぴ行の拗音',
      description: 'Learn the contracted sounds of the P-group.',
      characters: [
        {
          kana: 'ピャ',
          romaji: 'pya',
          strokeOrder: '',
          examples: [
            { word: 'ピャク', reading: 'pyaku', meaning: 'hundred (casual)' },
            { word: 'ピャピャ', reading: 'pyapya', meaning: 'pat-pat sound' }
          ]
        },
        {
          kana: 'ピュ',
          romaji: 'pyu',
          strokeOrder: '',
          examples: [
            { word: 'ピュウ', reading: 'pyuu', meaning: 'whoosh' },
            { word: 'ピュア', reading: 'pyua', meaning: 'pure' }
          ]
        },
        {
          kana: 'ピョ',
          romaji: 'pyo',
          strokeOrder: '',
          examples: [
            { word: 'ピョコピョコ', reading: 'pyokopyoko', meaning: 'hopping' },
            { word: 'ピョン', reading: 'pyon', meaning: 'hop' }
          ]
        }
      ]
    },
    {
      id: 'ミコンビナション',
      title: 'Combinations: M-Group',
      titleJp: 'み行の拗音',
      description: 'Learn the contracted sounds of the M-group.',
      characters: [
        {
          kana: 'ミャ',
          romaji: 'mya',
          strokeOrder: '',
          examples: [
            { word: 'ミャク', reading: 'myaku', meaning: 'pulse' },
            { word: 'ミャア', reading: 'myaa', meaning: 'meow' }
          ]
        },
        {
          kana: 'ミュ',
          romaji: 'myu',
          strokeOrder: '',
          examples: [
            { word: 'ミュージック', reading: 'myuujikku', meaning: 'music' },
            { word: 'ミュウ', reading: 'myuu', meaning: 'mew' }
          ]
        },
        {
          kana: 'ミョ',
          romaji: 'myo',
          strokeOrder: '',
          examples: [
            { word: 'ミョウジ', reading: 'myouji', meaning: 'surname' },
            { word: 'ミョウニチ', reading: 'myounichi', meaning: 'tomorrow' }
          ]
        }
      ]
    },
    {
      id: 'リコンビナション',
      title: 'Combinations: R-Group',
      titleJp: 'り行の拗音',
      description: 'Learn the contracted sounds of the R-group.',
      characters: [
        {
          kana: 'リャ',
          romaji: 'rya',
          strokeOrder: '',
          examples: [
            { word: 'リャク', reading: 'ryaku', meaning: 'abbreviation' },
            { word: 'リャクゴ', reading: 'ryakugo', meaning: 'abbreviation' }
          ]
        },
        {
          kana: 'リュ',
          romaji: 'ryu',
          strokeOrder: '',
          examples: [
            { word: 'リュウ', reading: 'ryuu', meaning: 'dragon' },
            { word: 'リュウガク', reading: 'ryuugaku', meaning: 'study abroad' }
          ]
        },
        {
          kana: 'リョ',
          romaji: 'ryo',
          strokeOrder: '',
          examples: [
            { word: 'リョウリ', reading: 'ryouri', meaning: 'cooking' },
            { word: 'リョコウ', reading: 'ryokou', meaning: 'travel' }
          ]
        }
      ]
    }
  ];

  // Then define lessonGroups
  const lessonGroups = [
    {
      id: 'gojuon',
      title: 'Gojūon',
      titleJp: '五十音',
      description: 'The basic 46 characters of Katakana arranged in the traditional order.',
      lessons: lessons
    },
    {
      id: 'dakuon',
      title: 'Dakuon',
      titleJp: '濁音',
      description: 'Voiced variations of basic Katakana characters.',
      lessons: dakuonLessons
    },
    {
      id: 'handakuon',
      title: 'Handakuon',
      titleJp: '半濁音',
      description: 'Half-voiced variations of basic Katakana characters (は → ぱ).',
      lessons: handakuonLessons
    },
    {
      id: 'combinations',
      title: 'Combinations',
      titleJp: '拗音',
      description: 'Contracted sounds formed by combining i-row kana with や、ゆ、よ.',
      lessons: combinationLessons
    }
  ];

  // Then all the hooks
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [activeGroup, setActiveGroup] = useState('gojuon');
  const [japaneseVoice, setJapaneseVoice] = useState<SpeechSynthesisVoice | null>(null);

  const playAudio = useCallback((text: string) => {
    try {
      if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported');
        return;
      }

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.volume = 1;

      // Get voices again in case they weren't loaded initially
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.lang.includes('ja') || 
        v.lang.includes('JP') || 
        v.name.toLowerCase().includes('japanese')
      ) || japaneseVoice;

      if (voice) {
        utterance.voice = voice;
      }

      // Add error and end handlers
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
      };

      utterance.onend = () => {
        console.log('Speech finished');
      };

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  }, [japaneseVoice]);

  // useEffect hooks
  useEffect(() => {
    setIsClient(true);
    const storedLesson = localStorage.getItem('selectedLesson');
    const storedChar = localStorage.getItem('selectedChar');
    const storedCompletedLessons = localStorage.getItem('completedLessons');

    if (storedLesson) setSelectedLesson(storedLesson);
    if (storedChar) setSelectedChar(storedChar);
    if (storedCompletedLessons) {
      try {
        setCompletedLessons(JSON.parse(storedCompletedLessons));
      } catch (e) {
        console.error('Error parsing completedLessons:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    if (selectedLesson) {
      localStorage.setItem('selectedLesson', selectedLesson);
    }
    if (selectedChar) {
      localStorage.setItem('selectedChar', selectedChar);
    }
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [selectedLesson, selectedChar, completedLessons, isClient]);

  // Add this new useEffect for default selection
  useEffect(() => {
    if (isClient) {
      const firstLesson = lessonGroups.find(g => g.id === activeGroup)?.lessons[0];
      const firstChar = firstLesson?.characters[0];
      
      if (firstLesson && firstChar) {
        setSelectedLesson(firstLesson.id);
        setSelectedChar(firstChar.kana);
      }
    }
  }, [isClient, activeGroup]);

  // Update the voice loading useEffect
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => 
        v.lang.includes('ja') || 
        v.lang.includes('JP') || 
        v.name.toLowerCase().includes('japanese')
      );
      if (voice) {
        console.log('Japanese voice found:', voice.name);
        setJapaneseVoice(voice);
      } else {
        console.log('No Japanese voice found, available voices:', voices);
      }
    };

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Initial load
      loadVoices();
      
      // Set up event listener for when voices are ready
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoices();
      };

      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  // Only render motion components after client-side hydration
  if (!isClient) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            {/* Loading state or initial content */}
            <div className="flex justify-center items-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentGroup = lessonGroups.find(g => g.id === activeGroup);
  const currentLesson = currentGroup?.lessons.find(l => l.id === selectedLesson);

  const CharacterDetail = () => {
    // Find the current lesson from either gojuon or dakuon lessons
    const lesson = currentGroup?.lessons.find(l => l.id === selectedLesson);
    const char = lesson?.characters.find(c => c.kana === selectedChar);
    if (!char) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Main Character Display */}
          <div className="text-center">
            <div className="text-7xl md:text-[12rem] leading-none font-bold text-gray-900 dark:text-gray-100 mb-4">
              {char.kana}
            </div>
            <div className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-4">
              {char.romaji}
            </div>
            <button
              onClick={() => playAudio(char.kana)}
              className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-purple-500 
                hover:bg-purple-600 text-white rounded-full transition-all text-sm md:text-base"
            >
              <FiVolume2 /> Listen
            </button>
          </div>

          {/* Examples */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              Example Words
            </h4>
            {char.examples.map((example) => (
              <div
                key={example.word}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg md:rounded-xl p-3 md:p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {example.word}
                    </div>
                    <div className="text-sm">
                      <span className="text-purple-600 dark:text-purple-400">{example.reading}</span>
                      <span className="text-gray-700 dark:text-gray-400"> - {example.meaning}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => playAudio(example.word)}
                    className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-100 
                      dark:hover:bg-purple-900/30 rounded-full"
                  >
                    <FiPlay size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Add this component for theory display
  const TheorySection = ({ groupId }: { groupId: string }) => {
    const theories = {
      gojuon: {
        title: "Understanding Gojūon (五十音)",
        points: [
          "Gojūon literally means 'fifty sounds', though modern Japanese uses 46 basic characters.",
          "Characters are arranged in a systematic table with 5 vowels (ア、イ、ウ、エ、オ) and 10 consonant groups.",
          "Each consonant group (like カ行, サ行) follows the same vowel pattern (a, i, u, e, o).",
          "These are the basic, unvoiced sounds of Katakana."
        ]
      },
      dakuon: {
        title: "Understanding Dakuon (濁音)",
        points: [
          "Dakuon are voiced variants of basic Katakana characters, marked with two dots (゛).",
          "カ → ガ (ka → ga), サ → ザ (sa → za), タ → ダ (ta → da), ハ → バ (ha → ba)",
          "These create new consonant sounds by adding voice to the original sound.",
          "For example, カ (ka) becomes ガ (ga) by adding voice to the 'k' sound."
        ]
      },
      handakuon: {
        title: "Understanding Handakuon (半濁音)",
        points: [
          "Handakuon means 'half-voiced sound', marked with a small circle (゜).",
          "Only applies to the H-group (ハ行) characters: ハ → パ (ha → pa)",
          "Creates 'p' sounds from 'h' sounds: パ、ピ、プ、ペ、ポ (pa, pi, pu, pe, po)",
          "Used mainly in native Japanese words and foreign loanwords."
        ]
      },
      combinations: {
        title: "Understanding Yōon (拗音)",
        points: [
          "Yōon are contracted sounds formed by combining i-row kana with ヤ、ユ、ヨ.",
          "The ヤ、ユ、ヨ characters are written in smaller size when used in combinations.",
          "For example: キ (ki) + ヤ (ya) = キャ (kya)",
          "These combinations are essential for pronouncing many Japanese words correctly."
        ]
      }
    };

    const theory = theories[groupId as keyof typeof theories];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {theory.title}
        </h2>
        <ul className="space-y-3">
          {theory.points.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 
                text-purple-500 flex items-center justify-center text-sm">
                {index + 1}
              </div>
              <p className="text-gray-700 dark:text-gray-300">{point}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Learn Katakana
              <span className="block text-2xl text-gray-900 dark:text-purple-500 mt-2">
                カタカナ
              </span>
            </h1>
          </div>

          {/* Group Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 inline-flex shadow-lg">
              {lessonGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => {
                    setActiveGroup(group.id);
                    setSelectedLesson(null);
                    setSelectedChar(null);
                  }}
                  className={`px-6 py-2 rounded-md transition-all ${
                    activeGroup === group.id
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">{group.title}</div>
                  <div className="text-sm opacity-90">{group.titleJp}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Group Description */}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {lessonGroups.find(g => g.id === activeGroup)?.description}
            </p>
            <KatakanaChart />
          </div>

          {/* Theory Section */}
          <TheorySection groupId={activeGroup} />

          {/* Main Content - Side by Side Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Lessons List - Left Side */}
            <div className="lg:w-1/3 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">
              <div className="space-y-4">
                {lessonGroups.find(g => g.id === activeGroup)?.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson.id);
                      setSelectedChar(null);
                    }}
                    className={`w-full p-4 rounded-xl transition-all ${
                      selectedLesson === lesson.id
                        ? 'bg-purple-500 text-white shadow-xl'
                        : 'bg-white dark:bg-gray-800 hover:shadow-lg border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`p-3 rounded-full ${
                          selectedLesson === lesson.id
                            ? 'bg-purple-400'
                            : 'bg-purple-100 dark:bg-purple-900/30'
                        }`}>
                          {completedLessons.includes(lesson.id) ? (
                            <FiCheck className={selectedLesson === lesson.id ? 'text-white' : 'text-purple-500'} />
                          ) : (
                            <FiBookOpen className={selectedLesson === lesson.id ? 'text-white' : 'text-purple-500'} />
                          )}
                        </div>
                        <div className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                      </div>
                      <div className="text-left">
                        <h3 className={`font-semibold ${
                          selectedLesson === lesson.id 
                            ? 'text-white' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {lesson.title}
                        </h3>
                        <p className={`text-sm ${
                          selectedLesson === lesson.id 
                            ? 'text-purple-100' 
                            : 'text-gray-700 dark:text-gray-400'
                        }`}>
                          {lesson.titleJp}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Character Display - Right Side */}
            <div className="lg:w-2/3 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">
              {selectedLesson && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  {/* Selected Lesson Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentLesson?.title}
                    </h2>
                    <p className="text-purple-500 dark:text-purple-400">
                      {currentLesson?.titleJp}
                    </p>
                  </div>

                  {/* Characters Grid */}
                  <div className={`grid gap-4 ${
                    currentLesson?.characters.length === 1 ? 'grid-cols-1 max-w-[200px]' :
                    currentLesson?.characters.length === 2 ? 'grid-cols-2 max-w-[400px]' :
                    currentLesson?.characters.length === 3 ? 'grid-cols-3 max-w-[600px]' :
                    'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
                  } mx-auto mb-6`}>
                    {currentLesson?.characters.map((char) => (
                      <button
                        key={char.kana}
                        onClick={() => setSelectedChar(char.kana)}
                        className={`p-4 rounded-xl text-center transition-all ${
                          selectedChar === char.kana
                            ? 'bg-purple-500 text-white shadow-lg'
                            : 'bg-gray-50 dark:bg-gray-700 hover:shadow-md'
                        }`}
                      >
                        <div className={`text-4xl mb-2 ${
                          selectedChar === char.kana
                            ? 'text-white'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {char.kana}
                        </div>
                        <div className={`text-sm ${
                          selectedChar === char.kana
                            ? 'text-purple-100'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {char.romaji}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Character Detail */}
                  {selectedChar && (
                    <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                      <CharacterDetail />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BrowserWarningDialog />
    </>
  );
} 