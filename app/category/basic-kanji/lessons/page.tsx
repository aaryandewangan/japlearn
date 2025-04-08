'use client'
import { useState, useEffect, useCallback } from 'react';
import Header from '@/app/components/layout/Header';
import { FiVolume2, FiPlay, FiCheck, FiArrowRight, FiBookOpen, FiArrowDown } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BrowserWarningDialog from '@/app/components/BrowserWarningDialog';
import HiraganaChart from '@/app/components/HiraganaChart';

interface KanjiCharacter {
  kanji: string;
  meaning: string;
  onyomi: string[];
  kunyomi: string[];
  strokeOrder: string;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
}

interface KanjiLesson {
  id: string;
  title: string;
  titleJp: string;
  description: string;
  characters: KanjiCharacter[];
}

const LESSONS: KanjiLesson[] = [
  {
    id: 'people',
    title: 'People & Family',
    titleJp: '人と家族',
    description: 'Basic kanji related to people and family members',
    characters: [
      {
        kanji: '人',
        meaning: 'person',
        onyomi: ['ジン', 'ニン'],
        kunyomi: ['ひと'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '日本人', reading: 'nihonjin', meaning: 'Japanese person' },
          { word: '大人', reading: 'otona', meaning: 'adult' }
        ]
      },
      {
        kanji: '女',
        meaning: 'woman',
        onyomi: ['ジョ', 'ニョ'],
        kunyomi: ['おんな'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '女の人', reading: 'onnanohito', meaning: 'woman' },
          { word: '女子', reading: 'joshi', meaning: 'girl' }
        ]
      },
      {
        kanji: '男',
        meaning: 'man',
        onyomi: ['ダン', 'ナン'],
        kunyomi: ['おとこ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '男の人', reading: 'otokonohito', meaning: 'man' },
          { word: '男子', reading: 'danshi', meaning: 'boy' }
        ]
      },
      {
        kanji: '子',
        meaning: 'child',
        onyomi: ['シ', 'ス'],
        kunyomi: ['こ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '子供', reading: 'kodomo', meaning: 'child' },
          { word: '女子', reading: 'joshi', meaning: 'girl' }
        ]
      },
      {
        kanji: '少',
        meaning: 'few, little',
        onyomi: ['ショウ'],
        kunyomi: ['すく-ない'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '少女', reading: 'shoujo', meaning: 'girl' },
          { word: '少年', reading: 'shounen', meaning: 'boy' }
        ]
      },
      {
        kanji: '父',
        meaning: 'father',
        onyomi: ['フ'],
        kunyomi: ['ちち', 'とう'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お父さん', reading: 'otousan', meaning: 'father' },
          { word: '父母', reading: 'fubo', meaning: 'parents' }
        ]
      },
      {
        kanji: '母',
        meaning: 'mother',
        onyomi: ['ボ'],
        kunyomi: ['はは', 'かあ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お母さん', reading: 'okaasan', meaning: 'mother' },
          { word: '母国', reading: 'bokoku', meaning: 'motherland' }
        ]
      },
      {
        kanji: '兄',
        meaning: 'elder brother',
        onyomi: ['ケイ', 'キョウ'],
        kunyomi: ['あに'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お兄さん', reading: 'oniisan', meaning: 'older brother' },
          { word: '兄弟', reading: 'kyoudai', meaning: 'siblings' }
        ]
      },
      {
        kanji: '姉',
        meaning: 'elder sister',
        onyomi: ['シ'],
        kunyomi: ['あね'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お姉さん', reading: 'oneesan', meaning: 'older sister' },
          { word: '姉妹', reading: 'shimai', meaning: 'sisters' }
        ]
      },
      {
        kanji: '弟',
        meaning: 'younger brother',
        onyomi: ['テイ', 'デ'],
        kunyomi: ['おとうと'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お弟さん', reading: 'otoutosan', meaning: 'younger brother' },
          { word: '兄弟', reading: 'kyoudai', meaning: 'brothers' }
        ]
      },
      {
        kanji: '妹',
        meaning: 'younger sister',
        onyomi: ['マイ'],
        kunyomi: ['いもうと'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お妹さん', reading: 'imoutosan', meaning: 'younger sister' },
          { word: '姉妹', reading: 'shimai', meaning: 'sisters' }
        ]
      }
    ]
  },
  {
    id: 'directions',
    title: 'Basic Directions',
    titleJp: '方向',
    description: 'Essential directional kanji',
    characters: [
      {
        kanji: '上',
        meaning: 'up, above',
        onyomi: ['ジョウ'],
        kunyomi: ['うえ', 'あ-げる'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '上手', reading: 'jouzu', meaning: 'skillful' },
          { word: '上がる', reading: 'agaru', meaning: 'to rise' }
        ]
      },
      {
        kanji: '下',
        meaning: 'down, below',
        onyomi: ['カ', 'ゲ'],
        kunyomi: ['した', 'さ-げる'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '下手', reading: 'heta', meaning: 'unskillful' },
          { word: '下がる', reading: 'sagaru', meaning: 'to descend' }
        ]
      },
      {
        kanji: '左',
        meaning: 'left',
        onyomi: ['サ'],
        kunyomi: ['ひだり'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '左手', reading: 'hidarite', meaning: 'left hand' },
          { word: '左側', reading: 'hidarigawa', meaning: 'left side' }
        ]
      },
      {
        kanji: '右',
        meaning: 'right',
        onyomi: ['ウ', 'ユウ'],
        kunyomi: ['みぎ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '右手', reading: 'migite', meaning: 'right hand' },
          { word: '右側', reading: 'migigawa', meaning: 'right side' }
        ]
      },
      {
        kanji: '中',
        meaning: 'middle, inside',
        onyomi: ['チュウ'],
        kunyomi: ['なか'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '中心', reading: 'chuushin', meaning: 'center' },
          { word: '中国', reading: 'chuugoku', meaning: 'China' }
        ]
      },
      {
        kanji: '外',
        meaning: 'outside',
        onyomi: ['ガイ', 'ゲ'],
        kunyomi: ['そと', 'はず-れる'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '外国', reading: 'gaikoku', meaning: 'foreign country' },
          { word: '外出', reading: 'gaishutsu', meaning: 'going out' }
        ]
      },
      {
        kanji: '前',
        meaning: 'front, before',
        onyomi: ['ゼン'],
        kunyomi: ['まえ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '前日', reading: 'zenjitsu', meaning: 'previous day' },
          { word: '名前', reading: 'namae', meaning: 'name' }
        ]
      },
      {
        kanji: '後',
        meaning: 'back, after',
        onyomi: ['ゴ', 'コウ'],
        kunyomi: ['うし-ろ', 'あと'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '後ろ', reading: 'ushiro', meaning: 'behind' },
          { word: '午後', reading: 'gogo', meaning: 'afternoon' }
        ]
      }
    ]
  },
  {
    id: 'time',
    title: 'Time & Days',
    titleJp: '時間と曜日',
    description: 'Kanji used in time expressions and days of the week',
    characters: [
      {
        kanji: '日',
        meaning: 'day, sun',
        onyomi: ['ニチ', 'ジツ'],
        kunyomi: ['ひ', '-び'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '日曜日', reading: 'nichiyoubi', meaning: 'Sunday' },
          { word: '今日', reading: 'kyou', meaning: 'today' }
        ]
      },
      {
        kanji: '月',
        meaning: 'month, moon',
        onyomi: ['ゲツ', 'ガツ'],
        kunyomi: ['つき'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '月曜日', reading: 'getsuyoubi', meaning: 'Monday' },
          { word: '今月', reading: 'kongetsu', meaning: 'this month' }
        ]
      },
      {
        kanji: '年',
        meaning: 'year',
        onyomi: ['ネン'],
        kunyomi: ['とし'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '今年', reading: 'kotoshi', meaning: 'this year' },
          { word: '去年', reading: 'kyonen', meaning: 'last year' }
        ]
      },
      {
        kanji: '時',
        meaning: 'time, hour',
        onyomi: ['ジ'],
        kunyomi: ['とき'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '時間', reading: 'jikan', meaning: 'time' },
          { word: '何時', reading: 'nanji', meaning: 'what time' }
        ]
      }
    ]
  },
  {
    id: 'nature',
    title: 'Nature Elements',
    titleJp: '自然',
    description: 'Basic kanji for natural elements',
    characters: [
      {
        kanji: '水',
        meaning: 'water',
        onyomi: ['スイ'],
        kunyomi: ['みず'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '水曜日', reading: 'suiyoubi', meaning: 'Wednesday' },
          { word: '水分', reading: 'suibun', meaning: 'moisture' }
        ]
      },
      {
        kanji: '火',
        meaning: 'fire',
        onyomi: ['カ'],
        kunyomi: ['ひ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '火曜日', reading: 'kayoubi', meaning: 'Tuesday' },
          { word: '火山', reading: 'kazan', meaning: 'volcano' }
        ]
      }
    ]
  },
  {
    id: 'actions',
    title: 'Basic Actions',
    titleJp: '基本動作',
    description: 'Common action kanji',
    characters: [
      {
        kanji: '見',
        meaning: 'see, look',
        onyomi: ['ケン'],
        kunyomi: ['み-る', 'み-せる'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '見る', reading: 'miru', meaning: 'to see' },
          { word: '見せる', reading: 'miseru', meaning: 'to show' }
        ]
      },
      {
        kanji: '行',
        meaning: 'go',
        onyomi: ['コウ', 'ギョウ'],
        kunyomi: ['い-く', 'おこな-う'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '行く', reading: 'iku', meaning: 'to go' },
          { word: '旅行', reading: 'ryokou', meaning: 'travel' }
        ]
      },
      {
        kanji: '食',
        meaning: 'eat, food',
        onyomi: ['ショク'],
        kunyomi: ['た-べる'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '食べる', reading: 'taberu', meaning: 'to eat' },
          { word: '食事', reading: 'shokuji', meaning: 'meal' }
        ]
      },
      {
        kanji: '読',
        meaning: 'read',
        onyomi: ['ドク'],
        kunyomi: ['よ-む'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '読む', reading: 'yomu', meaning: 'to read' },
          { word: '読書', reading: 'dokusho', meaning: 'reading books' }
        ]
      },
      {
        kanji: '書',
        meaning: 'write',
        onyomi: ['ショ'],
        kunyomi: ['か-く'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '書く', reading: 'kaku', meaning: 'to write' },
          { word: '辞書', reading: 'jisho', meaning: 'dictionary' }
        ]
      },
      {
        kanji: '話',
        meaning: 'speak, talk',
        onyomi: ['ワ'],
        kunyomi: ['はな-す', 'はなし'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '話す', reading: 'hanasu', meaning: 'to speak' },
          { word: '電話', reading: 'denwa', meaning: 'telephone' }
        ]
      },
      {
        kanji: '聞',
        meaning: 'hear, listen',
        onyomi: ['ブン', 'モン'],
        kunyomi: ['き-く'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '聞く', reading: 'kiku', meaning: 'to listen' },
          { word: '新聞', reading: 'shinbun', meaning: 'newspaper' }
        ]
      }
    ]
  },
  {
    id: 'emotions',
    title: 'Emotions & Feelings',
    titleJp: '感情',
    description: 'Basic kanji for expressing emotions and feelings',
    characters: [
      {
        kanji: '楽',
        meaning: 'enjoyable, comfort',
        onyomi: ['ラク', 'ガク'],
        kunyomi: ['たの-しい'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '楽しい', reading: 'tanoshii', meaning: 'fun, enjoyable' },
          { word: '音楽', reading: 'ongaku', meaning: 'music' }
        ]
      },
      {
        kanji: '好',
        meaning: 'like, fond of',
        onyomi: ['コウ'],
        kunyomi: ['す-き', 'この-む'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '好き', reading: 'suki', meaning: 'like, love' },
          { word: '好む', reading: 'konomu', meaning: 'to prefer' }
        ]
      },
      {
        kanji: '悪',
        meaning: 'bad, evil',
        onyomi: ['アク'],
        kunyomi: ['わる-い'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '悪い', reading: 'warui', meaning: 'bad' },
          { word: '最悪', reading: 'saiaku', meaning: 'worst' }
        ]
      },
      {
        kanji: '喜',
        meaning: 'joy, delight',
        onyomi: ['キ'],
        kunyomi: ['よろこ-ぶ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '喜ぶ', reading: 'yorokobu', meaning: 'to be happy' },
          { word: '喜び', reading: 'yorokobi', meaning: 'joy' }
        ]
      },
      {
        kanji: '怒',
        meaning: 'anger',
        onyomi: ['ド'],
        kunyomi: ['おこ-る', 'いか-る'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '怒る', reading: 'okoru', meaning: 'to get angry' },
          { word: '怒り', reading: 'ikari', meaning: 'anger' }
        ]
      },
      {
        kanji: '哀',
        meaning: 'sorrow',
        onyomi: ['アイ'],
        kunyomi: ['あわ-れ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '哀れ', reading: 'aware', meaning: 'pitiful' },
          { word: '哀愁', reading: 'aishuu', meaning: 'melancholy' }
        ]
      }
    ]
  },
  {
    id: 'places',
    title: 'Places & Locations',
    titleJp: '場所',
    description: 'Common kanji for places and locations',
    characters: [
      {
        kanji: '家',
        meaning: 'house, home',
        onyomi: ['カ', 'ケ'],
        kunyomi: ['いえ', 'や'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '家族', reading: 'kazoku', meaning: 'family' },
          { word: 'お家', reading: 'ouchi', meaning: 'home' }
        ]
      },
      {
        kanji: '学',
        meaning: 'study, learning',
        onyomi: ['ガク'],
        kunyomi: ['まな-ぶ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '学校', reading: 'gakkou', meaning: 'school' },
          { word: '学生', reading: 'gakusei', meaning: 'student' }
        ]
      },
      {
        kanji: '校',
        meaning: 'school',
        onyomi: ['コウ'],
        kunyomi: [],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '学校', reading: 'gakkou', meaning: 'school' },
          { word: '校長', reading: 'kouchou', meaning: 'principal' }
        ]
      },
      {
        kanji: '店',
        meaning: 'store, shop',
        onyomi: ['テン'],
        kunyomi: ['みせ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お店', reading: 'omise', meaning: 'shop' },
          { word: '書店', reading: 'shoten', meaning: 'bookstore' }
        ]
      },
      {
        kanji: '駅',
        meaning: 'station',
        onyomi: ['エキ'],
        kunyomi: [],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '駅前', reading: 'ekimae', meaning: 'in front of the station' },
          { word: '地下駅', reading: 'chikaeki', meaning: 'underground station' }
        ]
      },
      {
        kanji: '社',
        meaning: 'company, shrine',
        onyomi: ['シャ'],
        kunyomi: ['やしろ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '会社', reading: 'kaisha', meaning: 'company' },
          { word: '神社', reading: 'jinja', meaning: 'shrine' }
        ]
      },
      {
        kanji: '寺',
        meaning: 'temple',
        onyomi: ['ジ'],
        kunyomi: ['てら'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: 'お寺', reading: 'otera', meaning: 'temple' },
          { word: '寺院', reading: 'jiin', meaning: 'temple' }
        ]
      }
    ]
  },
  {
    id: 'weather',
    title: 'Weather & Seasons',
    titleJp: '天気と季節',
    description: 'Kanji related to weather and seasons',
    characters: [
      {
        kanji: '雨',
        meaning: 'rain',
        onyomi: ['ウ'],
        kunyomi: ['あめ', 'あま-'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '雨天', reading: 'uten', meaning: 'rainy weather' },
          { word: '大雨', reading: 'ooame', meaning: 'heavy rain' }
        ]
      },
      {
        kanji: '雪',
        meaning: 'snow',
        onyomi: ['セツ'],
        kunyomi: ['ゆき'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '雪山', reading: 'yukiyama', meaning: 'snowy mountain' },
          { word: '大雪', reading: 'ooyuki', meaning: 'heavy snow' }
        ]
      },
      {
        kanji: '春',
        meaning: 'spring',
        onyomi: ['シュン'],
        kunyomi: ['はる'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '春休み', reading: 'haruyasumi', meaning: 'spring vacation' },
          { word: '春風', reading: 'harukaze', meaning: 'spring breeze' }
        ]
      },
      {
        kanji: '夏',
        meaning: 'summer',
        onyomi: ['カ'],
        kunyomi: ['なつ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '夏休み', reading: 'natsuyasumi', meaning: 'summer vacation' },
          { word: '真夏', reading: 'manatsu', meaning: 'midsummer' }
        ]
      },
      {
        kanji: '秋',
        meaning: 'autumn',
        onyomi: ['シュウ'],
        kunyomi: ['あき'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '秋分', reading: 'shuubun', meaning: 'autumn equinox' },
          { word: '初秋', reading: 'shoshuu', meaning: 'early autumn' }
        ]
      },
      {
        kanji: '冬',
        meaning: 'winter',
        onyomi: ['トウ'],
        kunyomi: ['ふゆ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '冬休み', reading: 'fuyuyasumi', meaning: 'winter vacation' },
          { word: '真冬', reading: 'mafuyu', meaning: 'midwinter' }
        ]
      },
      {
        kanji: '天',
        meaning: 'sky, heaven',
        onyomi: ['テン'],
        kunyomi: ['あま-'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '天気', reading: 'tenki', meaning: 'weather' },
          { word: '天国', reading: 'tengoku', meaning: 'heaven' }
        ]
      },
      {
        kanji: '空',
        meaning: 'sky, empty',
        onyomi: ['クウ'],
        kunyomi: ['そら', 'あ-く'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '空港', reading: 'kuukou', meaning: 'airport' },
          { word: '青空', reading: 'aozora', meaning: 'blue sky' }
        ]
      }
    ]
  },
  {
    id: 'nature-extended',
    title: 'Nature & Environment',
    titleJp: '自然と環境',
    description: 'Additional kanji for natural elements and environment',
    characters: [
      {
        kanji: '山',
        meaning: 'mountain',
        onyomi: ['サン'],
        kunyomi: ['やま'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '富士山', reading: 'fujisan', meaning: 'Mt. Fuji' },
          { word: '山道', reading: 'yamaji', meaning: 'mountain path' }
        ]
      },
      {
        kanji: '川',
        meaning: 'river',
        onyomi: ['セン'],
        kunyomi: ['かわ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '川岸', reading: 'kawagishi', meaning: 'riverbank' },
          { word: '小川', reading: 'ogawa', meaning: 'stream' }
        ]
      },
      {
        kanji: '木',
        meaning: 'tree, wood',
        onyomi: ['モク', 'ボク'],
        kunyomi: ['き'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '木々', reading: 'kigi', meaning: 'trees' },
          { word: '木材', reading: 'mokuzai', meaning: 'lumber' }
        ]
      },
      {
        kanji: '花',
        meaning: 'flower',
        onyomi: ['カ'],
        kunyomi: ['はな'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '花見', reading: 'hanami', meaning: 'flower viewing' },
          { word: '花火', reading: 'hanabi', meaning: 'fireworks' }
        ]
      },
      {
        kanji: '石',
        meaning: 'stone, rock',
        onyomi: ['セキ'],
        kunyomi: ['いし'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '石橋', reading: 'ishibashi', meaning: 'stone bridge' },
          { word: '宝石', reading: 'houseki', meaning: 'jewel, gem' }
        ]
      },
      {
        kanji: '土',
        meaning: 'earth, soil',
        onyomi: ['ド', 'ト'],
        kunyomi: ['つち'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '土地', reading: 'tochi', meaning: 'land, plot' },
          { word: '土曜日', reading: 'doyoubi', meaning: 'Saturday' }
        ]
      },
      {
        kanji: '海',
        meaning: 'sea, ocean',
        onyomi: ['カイ'],
        kunyomi: ['うみ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '海岸', reading: 'kaigan', meaning: 'seashore' },
          { word: '海外', reading: 'kaigai', meaning: 'overseas' }
        ]
      },
      {
        kanji: '風',
        meaning: 'wind',
        onyomi: ['フウ', 'フ'],
        kunyomi: ['かぜ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '台風', reading: 'taifuu', meaning: 'typhoon' },
          { word: '風邪', reading: 'kaze', meaning: 'cold (illness)' }
        ]
      },
      {
        kanji: '星',
        meaning: 'star',
        onyomi: ['セイ'],
        kunyomi: ['ほし'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '星座', reading: 'seiza', meaning: 'constellation' },
          { word: '流星', reading: 'ryuusei', meaning: 'shooting star' }
        ]
      },
      {
        kanji: '草',
        meaning: 'grass',
        onyomi: ['ソウ'],
        kunyomi: ['くさ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '草原', reading: 'sougen', meaning: 'grassland' },
          { word: '雑草', reading: 'zassou', meaning: 'weed' }
        ]
      },
      {
        kanji: '森',
        meaning: 'forest',
        onyomi: ['シン'],
        kunyomi: ['もり'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '森林', reading: 'shinrin', meaning: 'forest' },
          { word: '森羅', reading: 'shinra', meaning: 'all nature' }
        ]
      },
      {
        kanji: '池',
        meaning: 'pond',
        onyomi: ['チ'],
        kunyomi: ['いけ'],
        strokeOrder: 'https://raw.githubusercontent.com/path/to/stroke/order.gif',
        examples: [
          { word: '池袋', reading: 'ikebukuro', meaning: 'Ikebukuro (place name)' },
          { word: '電池', reading: 'denchi', meaning: 'battery' }
        ]
      }
    ]
  }
];

export default function KanjiLessons() {
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
      const firstLesson = LESSONS[0];
      const firstChar = firstLesson?.characters[0]?.kanji;
      
      if (firstLesson && firstChar) {
        setSelectedLesson(firstLesson.id);
        setSelectedChar(firstChar);
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

  const currentLesson = LESSONS.find(lesson => lesson.id === selectedLesson);
  const currentChar = currentLesson?.characters.find(char => char.kanji === selectedChar);

  const CharacterDetail = () => {
    if (!currentChar) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Main Character Display */}
          <div className="text-center">
            <div className="text-7xl md:text-[12rem] leading-none font-bold text-gray-900 dark:text-gray-100 mb-4">
              {currentChar.kanji}
            </div>
            <div className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-4">
              {currentChar.meaning}
            </div>
            <button
              onClick={() => playAudio(currentChar.kanji)}
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
            {currentChar.examples.map((example) => (
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
              Learn Kanji
              <span className="block text-2xl text-gray-900 dark:text-purple-500 mt-2">
                漢字
              </span>
            </h1>
          </div>

          {/* Group Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 inline-flex shadow-lg">
              {LESSONS.map((group) => (
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
              {LESSONS.find(g => g.id === activeGroup)?.description}
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
                {LESSONS.map((lesson, index) => (
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
                        key={char.kanji}
                        onClick={() => setSelectedChar(char.kanji)}
                        className={`p-4 rounded-xl text-center transition-all ${
                          selectedChar === char.kanji
                            ? 'bg-purple-500 text-white shadow-lg'
                            : 'bg-gray-50 dark:bg-gray-700 hover:shadow-md'
                        }`}
                      >
                        <div className={`text-4xl mb-2 ${
                          selectedChar === char.kanji
                            ? 'text-white'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {char.kanji}
                        </div>
                        <div className={`text-sm ${
                          selectedChar === char.kanji
                            ? 'text-purple-100'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {char.meaning}
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