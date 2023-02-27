const DUMMY_DATA = [
  [
    {
      postId: 1,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-발라드',
      },
    },
    {
      postId: 2,
      music: {
        musicName: '행복하지 말아요',
        thumbnailUrl: 'url',
        singer: 'mctheMax-발라드',
      },
    },
  ],
  [
    {
      postId: 3,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-힙합',
      },
    },
    {
      postId: 4,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-힙합',
      },
    },
  ],
  [
    {
      postId: 5,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-랩',
      },
    },
    {
      postId: 6,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-랩',
      },
    },
  ],
  [
    {
      postId: 7,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-K-Pop',
      },
    },

    {
      postId: 8,
      music: {
        musicName: 'ditto',
        thumbnailUrl: 'url',
        singer: '뉴진스-K-Pop',
      },
    },
  ],
  [],
];

export const getMyBattleListData = async (genre: string) => {
  try {
    if (genre === '발라드') {
      return DUMMY_DATA[0];
    } else if (genre === '힙합') {
      return DUMMY_DATA[1];
    } else if (genre === '랩') {
      return DUMMY_DATA[2];
    } else if (genre === 'k-pop') {
      return DUMMY_DATA[3];
    } else if (genre === '재즈') {
      return DUMMY_DATA[4];
    } else {
      return [];
    }
  } catch {
    throw new Error('패칭 실패');
  }
};
