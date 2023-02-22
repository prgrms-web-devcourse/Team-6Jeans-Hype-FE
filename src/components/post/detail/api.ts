const DUMMY_DATA = {
  data: [
    {
      success: true,
      message: '음악 공유 글 리스트 조회 성공',
      data: {
        music: {
          musicName: 'Ditto',
          musicUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/43/cc/b8/43ccb8f7-fc0a-2a2f-c119-472f602773b4/mzaf_2239518959918453885.plus.aac.ep.m4a',
          thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/maxresdefault.jpg',
          singer: '뉴진스',
          genre: {
            genreValue: 'BALLADE',
            genreName: '발라드',
          },
        },
        content: '이 노래 꼭 들어보셨으면 해요!',
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
    },
    {
      success: true,
      message: '음악 공유 글 리스트 조회 성공',
      data: {
        music: {
          musicName: 'Ditto',
          musicUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/43/cc/b8/43ccb8f7-fc0a-2a2f-c119-472f602773b4/mzaf_2239518959918453885.plus.aac.ep.m4a',
          thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/maxresdefault.jpg',
          singer: '뉴진스',
          genre: {
            genreValue: 'BALLADE',
            genreName: '발라드',
          },
        },
        content: '이 노래 꼭 들어보셨으면 해요!',
        likeCount: 10,
        isBattlePossible: false,
        nickname: 'Hype',
      },
    },
    {
      success: true,
      message: '음악 공유 글 리스트 조회 성공',
      data: {
        music: {
          musicName: 'Ditto',
          musicUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/43/cc/b8/43ccb8f7-fc0a-2a2f-c119-472f602773b4/mzaf_2239518959918453885.plus.aac.ep.m4a',
          thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/maxresdefault.jpg',
          singer: '뉴진스',
          genre: {
            genreValue: 'BALLADE',
            genreName: '발라드',
          },
        },
        content: undefined,
        likeCount: 10,
        isBattlePossible: true,
        nickname: 'Hype',
      },
    },
    {
      success: true,
      message: '음악 공유 글 리스트 조회 성공',
      data: {
        music: {
          musicName: 'Ditto',
          musicUrl:
            'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/43/cc/b8/43ccb8f7-fc0a-2a2f-c119-472f602773b4/mzaf_2239518959918453885.plus.aac.ep.m4a',
          thumbnailUrl: 'https://i.ytimg.com/vi/11cta61wi0g/maxresdefault.jpg',
          singer: '뉴진스',
          genre: {
            genreValue: 'BALLADE',
            genreName: '발라드',
          },
        },
        content: undefined,
        likeCount: 10,
        isBattlePossible: false,
        nickname: 'Hype',
      },
    },
  ],
};

export const getPostDetailData = async (postId: number) => {
  try {
    return DUMMY_DATA.data[postId - 1].data;
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
