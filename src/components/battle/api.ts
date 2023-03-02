import { axiosInstance } from '@/api';
import axios from 'axios';
import { Battles, Vote } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export const getBattle = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${SERVER}/battles`,
    });

    if (response.data.success) {
      const TEMP_DUMMY: Battles = {
        battleId: 1,
        battleGenre: {
          genreValue: 'CLASSIC',
          genreName: '클래식',
        },
        challenged: {
          postId: 1,
          music: {
            musicId: 'ABCD1234',
            singer: 'Gist',
            title: '신경 쓸 게 많아서 (Feat. The Quiett)',
            musicUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/31/18/8e/31188e1f-0079-2d1f-7428-29daa4163c07/mzaf_4295413803000543523.plus.aac.p.m4a',
            albumCoverUrl:
              'https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ca/20/55/ca205584-83ae-8be5-a415-03df7baae6cb/8809658318466_Cover.jpg/100x100bb.jpg',
            genre: {
              genreValue: 'CLASSIC',
              genreName: '클래식',
            },
          },
        },
        challenging: {
          postId: 2,
          music: {
            musicId: 'ABCD1235',
            singer: 'THAMA, Jayci yucca (제이씨 유카)',
            title: '떠나 (Prod. PATEKO (파테코))',
            musicUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/31/18/8e/31188e1f-0079-2d1f-7428-29daa4163c07/mzaf_4295413803000543523.plus.aac.p.m4a',
            albumCoverUrl:
              'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg',
            genre: {
              genreValue: 'CLASSIC',
              genreName: '클래식',
            },
          },
        },
      };

      const NEW_DUMMY = {
        challenged: {
          postId: TEMP_DUMMY.challenged.postId,
          music: {
            musicId: TEMP_DUMMY.challenged.music.musicId,
            singer: TEMP_DUMMY.challenged.music.singer,
            musicName: TEMP_DUMMY.challenged.music.title,
            musicUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/31/18/8e/31188e1f-0079-2d1f-7428-29daa4163c07/mzaf_4295413803000543523.plus.aac.p.m4a',
            albumCoverUrl:
              'https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ca/20/55/ca205584-83ae-8be5-a415-03df7baae6cb/8809658318466_Cover.jpg/100x100bb.jpg',
            genre: {
              genreValue: 'CLASSIC',
              genreName: '클래식',
            },
          },
        },
        challenging: {
          postId: 2,
          music: {
            musicId: 'ABCD1235',
            singer: 'THAMA, Jayci yucca (제이씨 유카)',
            title: '떠나 (Prod. PATEKO (파테코))',
            musicUrl:
              'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/31/18/8e/31188e1f-0079-2d1f-7428-29daa4163c07/mzaf_4295413803000543523.plus.aac.p.m4a',
            albumCoverUrl:
              'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg',
            genre: {
              genreValue: 'CLASSIC',
              genreName: '클래식',
            },
          },
        },
      };

      return TEMP_DUMMY; //response.data.data.battles;
    } else {
      return false;
    }
  } catch {}
};

export const createBattleVote = async (battleId: number, votedPostId: number) => {
  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `${SERVER}/battles/vote`,
      data: {
        battleId,
        votedPostId,
      },
    });

    const TEMP_DUMMY: Vote = {
      title: '떠나 (Prod. PATEKO (파테코))',
      albumCoverUrl:
        'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg',
      selectedPostVoteCnt: 175,
      oppositePostVoteCnt: 253,
    };

    return TEMP_DUMMY;
  } catch (error) {
    console.error(error);
  }
};
