'use client'
import { useState, useEffect, useCallback } from 'react';
import Header from '@/app/components/layout/Header';
import { FiVolume2, FiPlay, FiCheck, FiArrowRight, FiBookOpen, FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BrowserWarningDialog from '@/app/components/BrowserWarningDialog';
import HiraganaChart from '@/app/components/HiraganaChart';

interface HiraganaLesson {
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

export default function HiraganaLessons() {
  // First define lessons array
  const lessons: HiraganaLesson[] = [
    {
      id: 'vowels',
      title: 'Lesson 1: Vowels',
      titleJp: '母音 (Boin)',
      description: 'Start with the five basic vowels, the foundation of Hiragana.',
      characters: [
        {
          kana: 'あ',
          romaji: 'a',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/a.gif',
          examples: [
            { word: 'あか', reading: 'aka', meaning: 'red' },
            { word: 'あめ', reading: 'ame', meaning: 'rain' }
          ]
        },
        {
          kana: 'い',
          romaji: 'i',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/i.gif',
          examples: [
            { word: 'いぬ', reading: 'inu', meaning: 'dog' },
            { word: 'いし', reading: 'ishi', meaning: 'stone' }
          ]
        },
        {
          kana: 'う',
          romaji: 'u',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/u.gif',
          examples: [
            { word: 'うみ', reading: 'umi', meaning: 'sea' },
            { word: 'うた', reading: 'uta', meaning: 'song' }
          ]
        },
        {
          kana: 'え',
          romaji: 'e',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/e.gif',
          examples: [
            { word: 'えき', reading: 'eki', meaning: 'station' },
            { word: 'えん', reading: 'en', meaning: 'yen' }
          ]
        },
        {
          kana: 'お',
          romaji: 'o',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/o.gif',
          examples: [
            { word: 'おと', reading: 'oto', meaning: 'sound' },
            { word: 'おか', reading: 'oka', meaning: 'hill' }
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
          kana: 'か',
          romaji: 'ka',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ka.gif',
          examples: [
            { word: 'かい', reading: 'kai', meaning: 'shell' },
            { word: 'かさ', reading: 'kasa', meaning: 'umbrella' }
          ]
        },
        {
          kana: 'き',
          romaji: 'ki',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ki.gif',
          examples: [
            { word: 'きく', reading: 'kiku', meaning: 'chrysanthemum' },
            { word: 'きて', reading: 'kite', meaning: 'come' }
          ]
        },
        {
          kana: 'く',
          romaji: 'ku',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ku.gif',
          examples: [
            { word: 'くに', reading: 'kuni', meaning: 'country' },
            { word: 'くも', reading: 'kumo', meaning: 'cloud' }
          ]
        },
        {
          kana: 'け',
          romaji: 'ke',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ke.gif',
          examples: [
            { word: 'けん', reading: 'ken', meaning: 'prefecture' },
            { word: 'けさ', reading: 'kesa', meaning: 'this morning' }
          ]
        },
        {
          kana: 'こ',
          romaji: 'ko',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ko.gif',
          examples: [
            { word: 'こと', reading: 'koto', meaning: 'thing' },
            { word: 'ここ', reading: 'koko', meaning: 'here' }
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
          kana: 'さ',
          romaji: 'sa',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/sa.gif',
          examples: [
            { word: 'さけ', reading: 'sake', meaning: 'salmon/sake' },
            { word: 'さる', reading: 'saru', meaning: 'monkey' }
          ]
        },
        {
          kana: 'し',
          romaji: 'shi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/shi.gif',
          examples: [
            { word: 'しま', reading: 'shima', meaning: 'island' },
            { word: 'すし', reading: 'sushi', meaning: 'sushi' }
          ]
        },
        {
          kana: 'す',
          romaji: 'su',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/su.gif',
          examples: [
            { word: 'すき', reading: 'suki', meaning: 'like' },
            { word: 'すし', reading: 'sushi', meaning: 'sushi' }
          ]
        },
        {
          kana: 'せ',
          romaji: 'se',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/se.gif',
          examples: [
            { word: 'せんせい', reading: 'sensei', meaning: 'teacher' },
            { word: 'せかい', reading: 'sekai', meaning: 'world' }
          ]
        },
        {
          kana: 'そ',
          romaji: 'so',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/so.gif',
          examples: [
            { word: 'そら', reading: 'sora', meaning: 'sky' },
            { word: 'そと', reading: 'soto', meaning: 'outside' }
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
          kana: 'た',
          romaji: 'ta',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ta.gif',
          examples: [
            { word: 'たこ', reading: 'tako', meaning: 'octopus' },
            { word: 'たべる', reading: 'taberu', meaning: 'to eat' }
          ]
        },
        {
          kana: 'ち',
          romaji: 'chi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/chi.gif',
          examples: [
            { word: 'ちから', reading: 'chikara', meaning: 'power' },
            { word: 'ちず', reading: 'chizu', meaning: 'map' }
          ]
        },
        {
          kana: 'つ',
          romaji: 'tsu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/tsu.gif',
          examples: [
            { word: 'つき', reading: 'tsuki', meaning: 'moon' },
            { word: 'つくえ', reading: 'tsukue', meaning: 'desk' }
          ]
        },
        {
          kana: 'て',
          romaji: 'te',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/te.gif',
          examples: [
            { word: 'てがみ', reading: 'tegami', meaning: 'letter' },
            { word: 'てら', reading: 'tera', meaning: 'temple' }
          ]
        },
        {
          kana: 'と',
          romaji: 'to',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/to.gif',
          examples: [
            { word: 'とり', reading: 'tori', meaning: 'bird' },
            { word: 'とけい', reading: 'tokei', meaning: 'clock' }
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
          kana: 'な',
          romaji: 'na',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/na.gif',
          examples: [
            { word: 'なつ', reading: 'natsu', meaning: 'summer' },
            { word: 'なか', reading: 'naka', meaning: 'inside/relationship' }
          ]
        },
        {
          kana: 'に',
          romaji: 'ni',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ni.gif',
          examples: [
            { word: 'にく', reading: 'niku', meaning: 'meat' },
            { word: 'にわ', reading: 'niwa', meaning: 'garden' }
          ]
        },
        {
          kana: 'ぬ',
          romaji: 'nu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/nu.gif',
          examples: [
            { word: 'ぬま', reading: 'numa', meaning: 'swamp' },
            { word: 'ぬの', reading: 'nuno', meaning: 'cloth' }
          ]
        },
        {
          kana: 'ね',
          romaji: 'ne',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ne.gif',
          examples: [
            { word: 'ねこ', reading: 'neko', meaning: 'cat' },
            { word: 'ねつ', reading: 'netsu', meaning: 'fever' }
          ]
        },
        {
          kana: 'の',
          romaji: 'no',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/no.gif',
          examples: [
            { word: 'のみ', reading: 'nomi', meaning: 'drink' },
            { word: 'のり', reading: 'nori', meaning: 'seaweed' }
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
          kana: 'は',
          romaji: 'ha',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ha.gif',
          examples: [
            { word: 'はな', reading: 'hana', meaning: 'flower' },
            { word: 'はし', reading: 'hashi', meaning: 'chopsticks/bridge' }
          ]
        },
        {
          kana: 'ひ',
          romaji: 'hi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/hi.gif',
          examples: [
            { word: 'ひと', reading: 'hito', meaning: 'person' },
            { word: 'ひる', reading: 'hiru', meaning: 'afternoon' }
          ]
        },
        {
          kana: 'ふ',
          romaji: 'fu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/fu.gif',
          examples: [
            { word: 'ふゆ', reading: 'fuyu', meaning: 'winter' },
            { word: 'ふね', reading: 'fune', meaning: 'ship' }
          ]
        },
        {
          kana: 'へ',
          romaji: 'he',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/he.gif',
          examples: [
            { word: 'へや', reading: 'heya', meaning: 'room' },
            { word: 'へび', reading: 'hebi', meaning: 'snake' }
          ]
        },
        {
          kana: 'ほ',
          romaji: 'ho',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ho.gif',
          examples: [
            { word: 'ほし', reading: 'hoshi', meaning: 'star' },
            { word: 'ほん', reading: 'hon', meaning: 'book' }
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
          kana: 'ま',
          romaji: 'ma',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ma.gif',
          examples: [
            { word: 'まち', reading: 'machi', meaning: 'town/city' },
            { word: 'まど', reading: 'mado', meaning: 'window' }
          ]
        },
        {
          kana: 'み',
          romaji: 'mi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/mi.gif',
          examples: [
            { word: 'みず', reading: 'mizu', meaning: 'water' },
            { word: 'みみ', reading: 'mimi', meaning: 'ear' }
          ]
        },
        {
          kana: 'む',
          romaji: 'mu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/mu.gif',
          examples: [
            { word: 'むし', reading: 'mushi', meaning: 'insect' },
            { word: 'むら', reading: 'mura', meaning: 'village' }
          ]
        },
        {
          kana: 'め',
          romaji: 'me',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/me.gif',
          examples: [
            { word: 'めがね', reading: 'megane', meaning: 'glasses' },
            { word: 'あめ', reading: 'ame', meaning: 'rain' }
          ]
        },
        {
          kana: 'も',
          romaji: 'mo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/mo.gif',
          examples: [
            { word: 'もの', reading: 'mono', meaning: 'thing' },
            { word: 'もり', reading: 'mori', meaning: 'forest' }
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
          kana: 'や',
          romaji: 'ya',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ya.gif',
          examples: [
            { word: 'やま', reading: 'yama', meaning: 'mountain' },
            { word: 'やさい', reading: 'yasai', meaning: 'vegetable' }
          ]
        },
        {
          kana: 'ゆ',
          romaji: 'yu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/yu.gif',
          examples: [
            { word: 'ゆき', reading: 'yuki', meaning: 'snow' },
            { word: 'ゆび', reading: 'yubi', meaning: 'finger' }
          ]
        },
        {
          kana: 'よ',
          romaji: 'yo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/yo.gif',
          examples: [
            { word: 'よる', reading: 'yoru', meaning: 'night' },
            { word: 'よむ', reading: 'yomu', meaning: 'to read' }
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
          kana: 'ら',
          romaji: 'ra',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ra.gif',
          examples: [
            { word: 'らく', reading: 'raku', meaning: 'comfortable' },
            { word: 'さくら', reading: 'sakura', meaning: 'cherry blossom' }
          ]
        },
        {
          kana: 'り',
          romaji: 'ri',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ri.gif',
          examples: [
            { word: 'りんご', reading: 'ringo', meaning: 'apple' },
            { word: 'とり', reading: 'tori', meaning: 'bird' }
          ]
        },
        {
          kana: 'る',
          romaji: 'ru',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ru.gif',
          examples: [
            { word: 'るす', reading: 'rusu', meaning: 'absence' },
            { word: 'ふる', reading: 'furu', meaning: 'to fall (rain/snow)' }
          ]
        },
        {
          kana: 'れ',
          romaji: 're',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/re.gif',
          examples: [
            { word: 'れきし', reading: 'rekishi', meaning: 'history' },
            { word: 'それ', reading: 'sore', meaning: 'that' }
          ]
        },
        {
          kana: 'ろ',
          romaji: 'ro',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ro.gif',
          examples: [
            { word: 'ろく', reading: 'roku', meaning: 'six' },
            { word: 'ころ', reading: 'koro', meaning: 'time/about' }
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
          kana: 'わ',
          romaji: 'wa',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/wa.gif',
          examples: [
            { word: 'わたし', reading: 'watashi', meaning: 'I/me' },
            { word: 'かわ', reading: 'kawa', meaning: 'river' }
          ]
        },
        {
          kana: 'を',
          romaji: 'wo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/wo.gif',
          examples: [
            { word: 'を', reading: 'wo', meaning: 'object particle' },
            { word: 'ほんを', reading: 'hon wo', meaning: 'book (as object)' }
          ]
        }
      ]
    },
    {
      id: 'n',
      title: 'Lesson 11: N',
      titleJp: 'ん (N)',
      description: 'Learn the N character, which always comes at the end of a syllable.',
      characters: [
        {
          kana: 'ん',
          romaji: 'n',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/n.gif',
          examples: [
            { word: 'にほん', reading: 'nihon', meaning: 'Japan' },
            { word: 'せんせい', reading: 'sensei', meaning: 'teacher' }
          ]
        }
      ]
    }
  ];

  // Then define dakuonLessons array
  const dakuonLessons: HiraganaLesson[] = [
    {
      id: 'g-group',
      title: 'Dakuon: G-Group',
      titleJp: 'が行 (Ga-gyō)',
      description: 'Learn the G-group voiced sounds (か → が).',
      characters: [
        {
          kana: 'が',
          romaji: 'ga',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ga.gif',
          examples: [
            { word: 'がっこう', reading: 'gakkou', meaning: 'school' },
            { word: 'がんばる', reading: 'ganbaru', meaning: 'to do one\'s best' }
          ]
        },
        {
          kana: 'ぎ',
          romaji: 'gi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/gi.gif',
          examples: [
            { word: 'ぎんこう', reading: 'ginkou', meaning: 'bank' },
            { word: 'かぎ', reading: 'kagi', meaning: 'key' }
          ]
        },
        {
          kana: 'ぐ',
          romaji: 'gu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/gu.gif',
          examples: [
            { word: 'ぐんたい', reading: 'guntai', meaning: 'army' },
            { word: 'もぐ', reading: 'mogu', meaning: 'to munch' }
          ]
        },
        {
          kana: 'げ',
          romaji: 'ge',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ge.gif',
          examples: [
            { word: 'げんき', reading: 'genki', meaning: 'healthy/energetic' },
            { word: 'あげる', reading: 'ageru', meaning: 'to give' }
          ]
        },
        {
          kana: 'ご',
          romaji: 'go',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/go.gif',
          examples: [
            { word: 'ごはん', reading: 'gohan', meaning: 'rice/meal' },
            { word: 'ごめん', reading: 'gomen', meaning: 'sorry' }
          ]
        }
      ]
    },
    {
      id: 'z-group',
      title: 'Dakuon: Z-Group',
      titleJp: 'ざ行 (Za-gyō)',
      description: 'Learn the Z-group voiced sounds (さ → ざ).',
      characters: [
        {
          kana: 'ざ',
          romaji: 'za',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/za.gif',
          examples: [
            { word: 'ざっし', reading: 'zasshi', meaning: 'magazine' },
            { word: 'ちず', reading: 'chizu', meaning: 'map' }
          ]
        },
        {
          kana: 'じ',
          romaji: 'ji',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ji.gif',
          examples: [
            { word: 'じかん', reading: 'jikan', meaning: 'time' },
            { word: 'もじ', reading: 'moji', meaning: 'character/letter' }
          ]
        },
        {
          kana: 'ず',
          romaji: 'zu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/zu.gif',
          examples: [
            { word: 'ずっと', reading: 'zutto', meaning: 'always' },
            { word: 'みず', reading: 'mizu', meaning: 'water' }
          ]
        },
        {
          kana: 'ぜ',
          romaji: 'ze',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ze.gif',
          examples: [
            { word: 'ぜんぶ', reading: 'zenbu', meaning: 'all/everything' },
            { word: 'かぜ', reading: 'kaze', meaning: 'wind/cold' }
          ]
        },
        {
          kana: 'ぞ',
          romaji: 'zo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/zo.gif',
          examples: [
            { word: 'ぞう', reading: 'zou', meaning: 'elephant' },
            { word: 'はなぞの', reading: 'hanazono', meaning: 'flower garden' }
          ]
        }
      ]
    },
    {
      id: 'd-group',
      title: 'Dakuon: D-Group',
      titleJp: 'だ行 (Da-gyō)',
      description: 'Learn the D-group voiced sounds (た → だ).',
      characters: [
        {
          kana: 'だ',
          romaji: 'da',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/da.gif',
          examples: [
            { word: 'だいがく', reading: 'daigaku', meaning: 'university' },
            { word: 'でんわ', reading: 'denwa', meaning: 'telephone' }
          ]
        },
        {
          kana: 'ぢ',
          romaji: 'ji',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/di.gif',
          examples: [
            { word: 'はなぢ', reading: 'hanaji', meaning: 'nosebleed' },
            { word: 'ちぢむ', reading: 'chijimu', meaning: 'to shrink' }
          ]
        },
        {
          kana: 'づ',
          romaji: 'zu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/du.gif',
          examples: [
            { word: 'つづく', reading: 'tsuzuku', meaning: 'to continue' },
            { word: 'みかづき', reading: 'mikazuki', meaning: 'crescent moon' }
          ]
        },
        {
          kana: 'で',
          romaji: 'de',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/de.gif',
          examples: [
            { word: 'でんしゃ', reading: 'densha', meaning: 'train' },
            { word: 'うで', reading: 'ude', meaning: 'arm' }
          ]
        },
        {
          kana: 'ど',
          romaji: 'do',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/do.gif',
          examples: [
            { word: 'どうぶつ', reading: 'doubutsu', meaning: 'animal' },
            { word: 'まど', reading: 'mado', meaning: 'window' }
          ]
        }
      ]
    },
    {
      id: 'b-group',
      title: 'Dakuon: B-Group',
      titleJp: 'ば行 (Ba-gyō)',
      description: 'Learn the B-group voiced sounds (は → ば).',
      characters: [
        {
          kana: 'ば',
          romaji: 'ba',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/ba.gif',
          examples: [
            { word: 'ばんごはん', reading: 'bangohan', meaning: 'dinner' },
            { word: 'たばこ', reading: 'tabako', meaning: 'cigarette' }
          ]
        },
        {
          kana: 'び',
          romaji: 'bi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/bi.gif',
          examples: [
            { word: 'びょうき', reading: 'byouki', meaning: 'illness' },
            { word: 'えんぴつ', reading: 'enpitsu', meaning: 'pencil' }
          ]
        },
        {
          kana: 'ぶ',
          romaji: 'bu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/bu.gif',
          examples: [
            { word: 'ぶんぽう', reading: 'bunpou', meaning: 'grammar' },
            { word: 'てぶくろ', reading: 'tebukuro', meaning: 'gloves' }
          ]
        },
        {
          kana: 'べ',
          romaji: 'be',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/be.gif',
          examples: [
            { word: 'べんきょう', reading: 'benkyou', meaning: 'study' },
            { word: 'なべ', reading: 'nabe', meaning: 'pot' }
          ]
        },
        {
          kana: 'ぼ',
          romaji: 'bo',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/bo.gif',
          examples: [
            { word: 'ぼうし', reading: 'boushi', meaning: 'hat' },
            { word: 'たんぼ', reading: 'tanbo', meaning: 'rice field' }
          ]
        }
      ]
    }
  ];

  // Add this to your lessonGroups array
  const handakuonLessons: HiraganaLesson[] = [
    {
      id: 'p-group',
      title: 'Handakuon: P-Group',
      titleJp: 'ぱ行 (Pa-gyō)',
      description: 'Learn the P-group half-voiced sounds (は → ぱ).',
      characters: [
        {
          kana: 'ぱ',
          romaji: 'pa',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/pa.gif',
          examples: [
            { word: 'ぱん', reading: 'pan', meaning: 'bread' },
            { word: 'ぱちぱち', reading: 'pachipachi', meaning: 'crackling/popping' }
          ]
        },
        {
          kana: 'ぴ',
          romaji: 'pi',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/pi.gif',
          examples: [
            { word: 'ぴかぴか', reading: 'pikapika', meaning: 'sparkly/shiny' },
            { word: 'ぴったり', reading: 'pittari', meaning: 'perfect fit' }
          ]
        },
        {
          kana: 'ぷ',
          romaji: 'pu',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/pu.gif',
          examples: [
            { word: 'ぷりん', reading: 'purin', meaning: 'pudding' },
            { word: 'ぷらす', reading: 'purasu', meaning: 'plus' }
          ]
        },
        {
          kana: 'ぺ',
          romaji: 'pe',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/pe.gif',
          examples: [
            { word: 'ぺん', reading: 'pen', meaning: 'pen' },
            { word: 'ぺらぺら', reading: 'perapera', meaning: 'fluent' }
          ]
        },
        {
          kana: 'ぽ',
          romaji: 'po',
          strokeOrder: 'https://raw.githubusercontent.com/PizzaRat105/PizzaRatStrokeDiagrams/main/po.gif',
          examples: [
            { word: 'ぽけっと', reading: 'poketto', meaning: 'pocket' },
            { word: 'ぽい', reading: 'poi', meaning: 'like/similar to' }
          ]
        }
      ]
    }
  ];

  // Add this new array after handakuonLessons
  const combinationLessons: HiraganaLesson[] = [
    {
      id: 'k-combinations',
      title: 'Combinations: K-Group',
      titleJp: 'か行の拗音',
      description: 'Learn the contracted sounds of the K-group.',
      characters: [
        {
          kana: 'きゃ',
          romaji: 'kya',
          strokeOrder: '',
          examples: [
            { word: 'きゃく', reading: 'kyaku', meaning: 'guest' },
            { word: 'きゃんせる', reading: 'kyanseru', meaning: 'cancel' }
          ]
        },
        {
          kana: 'きゅ',
          romaji: 'kyu',
          strokeOrder: '',
          examples: [
            { word: 'きゅうり', reading: 'kyuuri', meaning: 'cucumber' },
            { word: 'きゅう', reading: 'kyuu', meaning: 'nine' }
          ]
        },
        {
          kana: 'きょ',
          romaji: 'kyo',
          strokeOrder: '',
          examples: [
            { word: 'きょう', reading: 'kyou', meaning: 'today' },
            { word: 'きょうしつ', reading: 'kyoushitsu', meaning: 'classroom' }
          ]
        }
      ]
    },
    {
      id: 'g-combinations',
      title: 'Combinations: G-Group',
      titleJp: 'が行の拗音',
      description: 'Learn the contracted sounds of the G-group.',
      characters: [
        {
          kana: 'ぎゃ',
          romaji: 'gya',
          strokeOrder: '',
          examples: [
            { word: 'ぎゃく', reading: 'gyaku', meaning: 'opposite' },
            { word: 'ぎゃくてん', reading: 'gyakuten', meaning: 'reversal' }
          ]
        },
        {
          kana: 'ぎゅ',
          romaji: 'gyu',
          strokeOrder: '',
          examples: [
            { word: 'ぎゅうにく', reading: 'gyuuniku', meaning: 'beef' },
            { word: 'ぎゅうにゅう', reading: 'gyuunyuu', meaning: 'milk' }
          ]
        },
        {
          kana: 'ぎょ',
          romaji: 'gyo',
          strokeOrder: '',
          examples: [
            { word: 'ぎょうざ', reading: 'gyouza', meaning: 'dumpling' },
            { word: 'ぎょうむ', reading: 'gyoumu', meaning: 'business' }
          ]
        }
      ]
    },
    {
      id: 's-combinations',
      title: 'Combinations: S-Group',
      titleJp: 'さ行の拗音',
      description: 'Learn the contracted sounds of the S-group.',
      characters: [
        {
          kana: 'しゃ',
          romaji: 'sha',
          strokeOrder: '',
          examples: [
            { word: 'しゃしん', reading: 'shashin', meaning: 'photograph' },
            { word: 'しゃべる', reading: 'shaberu', meaning: 'to chat' }
          ]
        },
        {
          kana: 'しゅ',
          romaji: 'shu',
          strokeOrder: '',
          examples: [
            { word: 'しゅみ', reading: 'shumi', meaning: 'hobby' },
            { word: 'しゅくだい', reading: 'shukudai', meaning: 'homework' }
          ]
        },
        {
          kana: 'しょ',
          romaji: 'sho',
          strokeOrder: '',
          examples: [
            { word: 'しょくじ', reading: 'shokuji', meaning: 'meal' },
            { word: 'しょうゆ', reading: 'shouyu', meaning: 'soy sauce' }
          ]
        }
      ]
    },
    {
      id: 'j-combinations',
      title: 'Combinations: J-Group',
      titleJp: 'じ行の拗音',
      description: 'Learn the contracted sounds of the J-group.',
      characters: [
        {
          kana: 'じゃ',
          romaji: 'ja',
          strokeOrder: '',
          examples: [
            { word: 'じゃあ', reading: 'jaa', meaning: 'well then' },
            { word: 'おちゃ', reading: 'ocha', meaning: 'tea' }
          ]
        },
        {
          kana: 'じゅ',
          romaji: 'ju',
          strokeOrder: '',
          examples: [
            { word: 'じゅぎょう', reading: 'jugyou', meaning: 'class' },
            { word: 'じゅう', reading: 'juu', meaning: 'ten' }
          ]
        },
        {
          kana: 'じょ',
          romaji: 'jo',
          strokeOrder: '',
          examples: [
            { word: 'じょうず', reading: 'jouzu', meaning: 'skilled' },
            { word: 'じょうほう', reading: 'jouhou', meaning: 'information' }
          ]
        }
      ]
    },
    {
      id: 'ch-combinations',
      title: 'Combinations: Ch-Group',
      titleJp: 'ち行の拗音',
      description: 'Learn the contracted sounds of the Ch-group.',
      characters: [
        {
          kana: 'ちゃ',
          romaji: 'cha',
          strokeOrder: '',
          examples: [
            { word: 'ちゃわん', reading: 'chawan', meaning: 'rice bowl' },
            { word: 'ちゃいろ', reading: 'chairo', meaning: 'brown' }
          ]
        },
        {
          kana: 'ちゅ',
          romaji: 'chu',
          strokeOrder: '',
          examples: [
            { word: 'ちゅうい', reading: 'chuui', meaning: 'attention' },
            { word: 'ちゅうごく', reading: 'chuugoku', meaning: 'China' }
          ]
        },
        {
          kana: 'ちょ',
          romaji: 'cho',
          strokeOrder: '',
          examples: [
            { word: 'ちょっと', reading: 'chotto', meaning: 'a little' },
            { word: 'ちょうちょ', reading: 'choucho', meaning: 'butterfly' }
          ]
        }
      ]
    },
    {
      id: 'n-combinations',
      title: 'Combinations: N-Group',
      titleJp: 'に行の拗音',
      description: 'Learn the contracted sounds of the N-group.',
      characters: [
        {
          kana: 'にゃ',
          romaji: 'nya',
          strokeOrder: '',
          examples: [
            { word: 'にゃん', reading: 'nyan', meaning: 'meow' },
            { word: 'にゃんこ', reading: 'nyanko', meaning: 'kitty' }
          ]
        },
        {
          kana: 'にゅ',
          romaji: 'nyu',
          strokeOrder: '',
          examples: [
            { word: 'にゅうがく', reading: 'nyuugaku', meaning: 'school admission' },
            { word: 'にゅうす', reading: 'nyuusu', meaning: 'news' }
          ]
        },
        {
          kana: 'にょ',
          romaji: 'nyo',
          strokeOrder: '',
          examples: [
            { word: 'にょう', reading: 'nyou', meaning: 'urine' },
            { word: 'かにょう', reading: 'kanyou', meaning: 'inclusion' }
          ]
        }
      ]
    },
    {
      id: 'h-combinations',
      title: 'Combinations: H-Group',
      titleJp: 'ひ行の拗音',
      description: 'Learn the contracted sounds of the H-group.',
      characters: [
        {
          kana: 'ひゃ',
          romaji: 'hya',
          strokeOrder: '',
          examples: [
            { word: 'ひゃく', reading: 'hyaku', meaning: 'hundred' },
            { word: 'ひゃくえん', reading: 'hyakuen', meaning: '100 yen' }
          ]
        },
        {
          kana: 'ひゅ',
          romaji: 'hyu',
          strokeOrder: '',
          examples: [
            { word: 'ひゅうが', reading: 'hyuuga', meaning: 'Hyuga (place name)' },
            { word: 'ひゅう', reading: 'hyuu', meaning: 'whoosh (sound)' }
          ]
        },
        {
          kana: 'ひょ',
          romaji: 'hyo',
          strokeOrder: '',
          examples: [
            { word: 'ひょう', reading: 'hyou', meaning: 'chart' },
            { word: 'ひょうき', reading: 'hyouki', meaning: 'notation' }
          ]
        }
      ]
    },
    {
      id: 'b-combinations',
      title: 'Combinations: B-Group',
      titleJp: 'び行の拗音',
      description: 'Learn the contracted sounds of the B-group.',
      characters: [
        {
          kana: 'びゃ',
          romaji: 'bya',
          strokeOrder: '',
          examples: [
            { word: 'びゃくや', reading: 'byakuya', meaning: 'midnight' },
            { word: 'びゃっこ', reading: 'byakko', meaning: 'white fox' }
          ]
        },
        {
          kana: 'びゅ',
          romaji: 'byu',
          strokeOrder: '',
          examples: [
            { word: 'びゅう', reading: 'byuu', meaning: 'whoosh' },
            { word: 'びゅうびゅう', reading: 'byuubyuu', meaning: 'whistling sound' }
          ]
        },
        {
          kana: 'びょ',
          romaji: 'byo',
          strokeOrder: '',
          examples: [
            { word: 'びょうき', reading: 'byouki', meaning: 'illness' },
            { word: 'びょういん', reading: 'byouin', meaning: 'hospital' }
          ]
        }
      ]
    },
    {
      id: 'p-combinations',
      title: 'Combinations: P-Group',
      titleJp: 'ぴ行の拗音',
      description: 'Learn the contracted sounds of the P-group.',
      characters: [
        {
          kana: 'ぴゃ',
          romaji: 'pya',
          strokeOrder: '',
          examples: [
            { word: 'ぴゃく', reading: 'pyaku', meaning: 'hundred (casual)' },
            { word: 'ぴゃぴゃ', reading: 'pyapya', meaning: 'pat-pat sound' }
          ]
        },
        {
          kana: 'ぴゅ',
          romaji: 'pyu',
          strokeOrder: '',
          examples: [
            { word: 'ぴゅう', reading: 'pyuu', meaning: 'whoosh' },
            { word: 'ぴゅあ', reading: 'pyua', meaning: 'pure' }
          ]
        },
        {
          kana: 'ぴょ',
          romaji: 'pyo',
          strokeOrder: '',
          examples: [
            { word: 'ぴょこぴょこ', reading: 'pyokopyoko', meaning: 'hopping' },
            { word: 'ぴょん', reading: 'pyon', meaning: 'hop' }
          ]
        }
      ]
    },
    {
      id: 'm-combinations',
      title: 'Combinations: M-Group',
      titleJp: 'み行の拗音',
      description: 'Learn the contracted sounds of the M-group.',
      characters: [
        {
          kana: 'みゃ',
          romaji: 'mya',
          strokeOrder: '',
          examples: [
            { word: 'みゃく', reading: 'myaku', meaning: 'pulse' },
            { word: 'みゃあ', reading: 'myaa', meaning: 'meow' }
          ]
        },
        {
          kana: 'みゅ',
          romaji: 'myu',
          strokeOrder: '',
          examples: [
            { word: 'みゅーじっく', reading: 'myuujikku', meaning: 'music' },
            { word: 'みゅう', reading: 'myuu', meaning: 'mew' }
          ]
        },
        {
          kana: 'みょ',
          romaji: 'myo',
          strokeOrder: '',
          examples: [
            { word: 'みょうじ', reading: 'myouji', meaning: 'surname' },
            { word: 'みょうにち', reading: 'myounichi', meaning: 'tomorrow' }
          ]
        }
      ]
    },
    {
      id: 'r-combinations',
      title: 'Combinations: R-Group',
      titleJp: 'り行の拗音',
      description: 'Learn the contracted sounds of the R-group.',
      characters: [
        {
          kana: 'りゃ',
          romaji: 'rya',
          strokeOrder: '',
          examples: [
            { word: 'りゃく', reading: 'ryaku', meaning: 'abbreviation' },
            { word: 'りゃくご', reading: 'ryakugo', meaning: 'abbreviation' }
          ]
        },
        {
          kana: 'りゅ',
          romaji: 'ryu',
          strokeOrder: '',
          examples: [
            { word: 'りゅう', reading: 'ryuu', meaning: 'dragon' },
            { word: 'りゅうがく', reading: 'ryuugaku', meaning: 'study abroad' }
          ]
        },
        {
          kana: 'りょ',
          romaji: 'ryo',
          strokeOrder: '',
          examples: [
            { word: 'りょうり', reading: 'ryouri', meaning: 'cooking' },
            { word: 'りょこう', reading: 'ryokou', meaning: 'travel' }
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
      description: 'The basic 46 characters of Hiragana arranged in the traditional order.',
      lessons: lessons
    },
    {
      id: 'dakuon',
      title: 'Dakuon',
      titleJp: '濁音',
      description: 'Voiced variations of basic Hiragana characters.',
      lessons: dakuonLessons
    },
    {
      id: 'handakuon',
      title: 'Handakuon',
      titleJp: '半濁音',
      description: 'Half-voiced variations of basic Hiragana characters (は → ぱ).',
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
          "Characters are arranged in a systematic table with 5 vowels (あ、い、う、え、お) and 10 consonant groups.",
          "Each consonant group (like か行, さ行) follows the same vowel pattern (a, i, u, e, o).",
          "These are the basic, unvoiced sounds of Hiragana."
        ]
      },
      dakuon: {
        title: "Understanding Dakuon (濁音)",
        points: [
          "Dakuon are voiced variants of basic Hiragana characters, marked with two dots (゛).",
          "か → が (ka → ga), さ → ざ (sa → za), た → だ (ta → da), は → ば (ha → ba)",
          "These create new consonant sounds by adding voice to the original sound.",
          "For example, か (ka) becomes が (ga) by adding voice to the 'k' sound."
        ]
      },
      handakuon: {
        title: "Understanding Handakuon (半濁音)",
        points: [
          "Handakuon means 'half-voiced sound', marked with a small circle (゜).",
          "Only applies to the H-group (は行) characters: は → ぱ (ha → pa)",
          "Creates 'p' sounds from 'h' sounds: ぱ、ぴ、ぷ、ぺ、ぽ (pa, pi, pu, pe, po)",
          "Used mainly in native Japanese words and foreign loanwords."
        ]
      },
      combinations: {
        title: "Understanding Yōon (拗音)",
        points: [
          "Yōon are contracted sounds formed by combining i-row kana with や、ゆ、よ.",
          "The や、ゆ、よ characters are written in smaller size when used in combinations.",
          "For example: き (ki) + や (ya) = きゃ (kya)",
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
              Learn Hiragana
              <span className="block text-2xl text-gray-900 dark:text-purple-500 mt-2">
                ひらがな
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
            <HiraganaChart />
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