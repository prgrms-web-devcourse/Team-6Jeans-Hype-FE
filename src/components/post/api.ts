// by 민형, 임시 더미 데이터_230221
const DUMMY_DATA = {
  success: true,
  message: '음악 공유 글 리스트 조회 성공',
  data: {
    posts: [
      {
        postId: 1,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '힙합 / 랩',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 2,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '힙합 / 랩',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 3,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '락 / 메탈',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 4,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '락 / 메탈',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 5,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '인디 / 어쿠스틱',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 6,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '인디 / 어쿠스틱',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 7,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '발라드',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
      {
        postId: 8,
        music: {
          musicName: 'Ditto',
          thumbnailUrl: 'url',
          singer: '뉴진스',
          genre: '발라드',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
    ],
  },
};

export const getPostFeedData = async (genre: string) => {
  try {
    // const res = await axios.get('url', {
    //   headers: { 'Content-Type': 'application/json' },
    // });

    if (genre === 'all') return DUMMY_DATA.data.posts;
    else if (genre === '힙합 / 랩') return DUMMY_DATA.data.posts.slice(0, 2);
    else if (genre === '락 / 메탈') return DUMMY_DATA.data.posts.slice(2, 4);
    else if (genre === '인디 / 어쿠스틱') return DUMMY_DATA.data.posts.slice(4, 6);
    else if (genre === '발라드') return DUMMY_DATA.data.posts.slice(6, 8);
    else return [];
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
