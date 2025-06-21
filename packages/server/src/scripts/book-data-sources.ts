/**
 * 様々なデータソースから本の情報を取得するための定義
 */

export interface BookDataSource {
  name: string;
  description: string;
  baseUrl: string;
  rateLimit: number; // requests per minute
  requiresApiKey: boolean;
  supportedLanguages: string[];
}

export interface BookSearchQuery {
  type: 'isbn' | 'title' | 'author' | 'subject' | 'keyword';
  value: string;
  language?: string;
  maxResults?: number;
  startIndex?: number;
}

export interface BookCategory {
  name: string;
  japaneseName: string;
  searchQueries: string[];
  expectedCount: number;
  priority: number;
}

/**
 * 本のカテゴリ定義
 */
export const BOOK_CATEGORIES: BookCategory[] = [
  {
    name: 'japanese-literature',
    japaneseName: '日本文学',
    searchQueries: [
      'subject:fiction+inauthor:村上春樹',
      'subject:fiction+inauthor:東野圭吾',
      'subject:fiction+inauthor:湊かなえ',
      'subject:fiction+inauthor:伊坂幸太郎',
      'subject:fiction+inauthor:又吉直樹',
      'subject:fiction+inauthor:夏目漱石',
      'subject:fiction+inauthor:太宰治',
      'subject:fiction+inauthor:芥川龍之介',
      'subject:fiction+inauthor:森鴎外',
      'subject:fiction+inauthor:川端康成',
    ],
    expectedCount: 100,
    priority: 1,
  },
  {
    name: 'mystery-thriller',
    japaneseName: 'ミステリー・スリラー',
    searchQueries: [
      'subject:mystery+language:ja',
      'subject:thriller+language:ja',
      'intitle:殺人+subject:fiction',
      'intitle:探偵+subject:fiction',
      'intitle:推理+subject:fiction',
      'inauthor:松本清張',
      'inauthor:横溝正史',
      'inauthor:江戸川乱歩',
    ],
    expectedCount: 80,
    priority: 2,
  },
  {
    name: 'business-self-help',
    japaneseName: 'ビジネス・自己啓発',
    searchQueries: [
      'subject:business+language:ja',
      'subject:self-help+language:ja',
      'intitle:仕事+subject:business',
      'intitle:成功+subject:business',
      'intitle:習慣+subject:self-help',
      'intitle:マネジメント+subject:business',
      'intitle:リーダーシップ+subject:business',
      'intitle:投資+subject:business',
      'intitle:起業+subject:business',
      'intitle:副業+subject:business',
    ],
    expectedCount: 120,
    priority: 3,
  },
  {
    name: 'technology-programming',
    japaneseName: '技術・プログラミング',
    searchQueries: [
      'subject:computers+language:ja',
      'intitle:プログラミング+subject:computers',
      'intitle:JavaScript+subject:computers',
      'intitle:Python+subject:computers',
      'intitle:Java+subject:computers',
      'intitle:React+subject:computers',
      'intitle:データベース+subject:computers',
      'intitle:AI+subject:computers',
      'intitle:機械学習+subject:computers',
      'intitle:Web開発+subject:computers',
    ],
    expectedCount: 100,
    priority: 4,
  },
  {
    name: 'manga-light-novel',
    japaneseName: '漫画・ライトノベル',
    searchQueries: [
      'subject:comics+language:ja',
      'subject:juvenile-fiction+language:ja',
      'intitle:漫画',
      'intitle:ライトノベル',
      'intitle:コミック',
      'subject:graphic-novels+language:ja',
    ],
    expectedCount: 150,
    priority: 5,
  },
  {
    name: 'science-education',
    japaneseName: '科学・教育',
    searchQueries: [
      'subject:science+language:ja',
      'subject:education+language:ja',
      'intitle:科学+subject:science',
      'intitle:物理+subject:science',
      'intitle:化学+subject:science',
      'intitle:生物+subject:science',
      'intitle:数学+subject:mathematics',
      'intitle:教育+subject:education',
    ],
    expectedCount: 70,
    priority: 6,
  },
  {
    name: 'health-cooking',
    japaneseName: '健康・料理',
    searchQueries: [
      'subject:cooking+language:ja',
      'subject:health+language:ja',
      'intitle:料理+subject:cooking',
      'intitle:健康+subject:health',
      'intitle:ダイエット+subject:health',
      'intitle:レシピ+subject:cooking',
      'intitle:栄養+subject:health',
    ],
    expectedCount: 60,
    priority: 7,
  },
  {
    name: 'travel-hobby',
    japaneseName: '旅行・趣味',
    searchQueries: [
      'subject:travel+language:ja',
      'subject:sports+language:ja',
      'intitle:旅行+subject:travel',
      'intitle:スポーツ+subject:sports',
      'intitle:音楽+subject:music',
      'intitle:アート+subject:art',
      'intitle:写真+subject:photography',
    ],
    expectedCount: 50,
    priority: 8,
  },
  {
    name: 'philosophy-psychology',
    japaneseName: '哲学・心理学',
    searchQueries: [
      'subject:philosophy+language:ja',
      'subject:psychology+language:ja',
      'intitle:哲学+subject:philosophy',
      'intitle:心理学+subject:psychology',
      'intitle:思想+subject:philosophy',
      'intitle:宗教+subject:religion',
    ],
    expectedCount: 40,
    priority: 9,
  },
  {
    name: 'history-biography',
    japaneseName: '歴史・伝記',
    searchQueries: [
      'subject:history+language:ja',
      'subject:biography+language:ja',
      'intitle:歴史+subject:history',
      'intitle:伝記+subject:biography',
      'intitle:戦国+subject:history',
      'intitle:明治+subject:history',
    ],
    expectedCount: 60,
    priority: 10,
  },
];

/**
 * 人気のある日本の書籍ISBN（拡張版）
 */
export const POPULAR_JAPANESE_ISBNS = [
  // 文学・小説
  '9784167158057', // ノルウェイの森（村上春樹）
  '9784167110178', // 1Q84 BOOK 1（村上春樹）
  '9784167110185', // 1Q84 BOOK 2（村上春樹）
  '9784167110192', // 1Q84 BOOK 3（村上春樹）
  '9784167305024', // 海辺のカフカ（村上春樹）
  '9784167661038', // 騎士団長殺し（村上春樹）
  '9784062639378', // 容疑者Xの献身（東野圭吾）
  '9784062768573', // 白夜行（東野圭吾）
  '9784062639385', // 秘密（東野圭吾）
  '9784062639392', // 手紙（東野圭吾）
  '9784062639408', // 流星の絆（東野圭吾）
  '9784101001616', // こころ（夏目漱石）
  '9784041026397', // 火花（又吉直樹）
  '9784062748476', // 君の名は。（新海誠）
  '9784087460615', // 蹴りたい背中（綿矢りさ）
  '9784087711202', // 博士の愛した数式（小川洋子）
  
  // ビジネス・自己啓発
  '9784799107713', // 嫌われる勇気
  '9784822255053', // ゼロ秒思考
  '9784569825885', // チーズはどこへ消えた？
  '9784478025819', // 7つの習慣
  '9784534054313', // 人を動かす
  '9784866510842', // 人生は、運よりも実力よりも「勘違いさせる力」で決まっている
  '9784763136596', // 好きなことだけで生きていく
  '9784799324226', // 多動力
  
  // 技術・プログラミング
  '9784297110895', // リーダブルコード
  '9784798155159', // JavaScript本格入門
  '9784873119038', // プログラミング作法
  '9784798121963', // オブジェクト指向でなぜつくるのか
  '9784873117782', // リファクタリング
  '9784797327038', // 達人プログラマー
  '9784774142043', // 入門Git
  '9784798124605', // Python入門
  
  // 漫画
  '9784088771090', // ONE PIECE 1巻
  '9784063384598', // 進撃の巨人 1巻
  '9784091234513', // DEATH NOTE 1巻
  '9784088598031', // 鬼滅の刃 1巻
  '9784088807767', // 呪術廻戦 1巻
  '9784088706219', // NARUTO 1巻
  '9784088706226', // BLEACH 1巻
  '9784063347432', // ドラゴンボール 1巻
  
  // 科学・教育
  '9784004140610', // 哲学入門（岩波新書）
  '9784004314809', // 日本の歴史（岩波新書）
  '9784061596269', // 数学入門（講談社学術文庫）
  '9784004315438', // 心理学概論（岩波新書）
  '9784004140627', // 物理学とは何だろうか
  '9784061596276', // 化学の基礎
  
  // 健康・料理
  '9784054066687', // 料理の基本
  '9784837672944', // 健康的な食事
  '9784072890226', // 簡単レシピ集
  '9784041104170', // 医者が教える食事術
  '9784800270795', // スタンフォード式 疲れない体
  
  // 趣味・旅行
  '9784398144133', // 地球の歩き方 日本
  '9784054066694', // 旅行ガイド
  '9784537260793', // 趣味の園芸
  '9784398144140', // 地球の歩き方 東京
  '9784398144157', // 地球の歩き方 大阪
];

/**
 * ベストセラー取得のための追加クエリ
 */
export const BESTSELLER_QUERIES = [
  'intitle:ベストセラー',
  'intitle:話題の本',
  'intitle:人気',
  'orderBy:newest+subject:fiction',
  'orderBy:newest+subject:business',
  'orderBy:newest+subject:self-help',
  'orderBy:relevance+subject:japanese-literature',
  'maxResults=40+orderBy:newest',
  'q=*+filter=partial+langRestrict=ja',
];

/**
 * 年代別の人気作品
 */
export const POPULAR_BOOKS_BY_ERA = {
  '2020s': [
    'intitle:2020+subject:fiction',
    'intitle:2021+subject:fiction',
    'intitle:2022+subject:fiction',
    'intitle:2023+subject:fiction',
    'publishedDate:2020..2023+subject:fiction',
  ],
  '2010s': [
    'publishedDate:2010..2019+subject:fiction',
    'publishedDate:2010..2019+subject:business',
  ],
  '2000s': [
    'publishedDate:2000..2009+subject:fiction',
    'publishedDate:2000..2009+subject:business',
  ],
  'classics': [
    'publishedDate:1900..1999+subject:fiction',
    'subject:classics+language:ja',
  ],
};

/**
 * 出版社別の人気作品
 */
export const POPULAR_PUBLISHERS = [
  '講談社',
  '集英社',
  '小学館',
  '新潮社',
  '文藝春秋',
  '角川書店',
  'ダイヤモンド社',
  '東洋経済新報社',
  '日本経済新聞出版社',
  'PHP研究所',
];

export const getPublisherQueries = (): string[] => {
  return POPULAR_PUBLISHERS.map(publisher => `inpublisher:${publisher}`);
};