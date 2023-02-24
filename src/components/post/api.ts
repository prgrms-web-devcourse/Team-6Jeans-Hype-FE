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
          genre: 'k-pop',
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
          genre: 'k-pop',
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
          genre: 'k-pop',
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
          genre: 'k-pop',
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
          genre: 'k-pop',
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
          genre: 'k-pop',
        },
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
    ],
  },
};

export const getPostFeedData = async () => {
  try {
    // const res = await axios.get('url', {
    //   headers: { 'Content-Type': 'application/json' },
    // });

    return DUMMY_DATA.data.posts;
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
