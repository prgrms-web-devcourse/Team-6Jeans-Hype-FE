import { axiosInstance } from '@/api';
import { TEMP_DUMMY } from './temp_dummy';
import { Battles, Vote } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_URL;
const exceptList: number[] = [];

export const getRandomBattle = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${SERVER}/battles/details`,
    });

    if (response.data.success) {
      const { battles } = response.data.data;

      if (battles.length) {
        const dataLength = battles.length;

        if (exceptList.length === dataLength) {
          exceptList.length = 0;
        }

        let targetNumber = Math.floor(Math.random() * dataLength);

        while (exceptList.indexOf(targetNumber) !== -1) {
          targetNumber = Math.floor(Math.random() * dataLength);
        }

        exceptList.push(targetNumber);

        return battles[targetNumber];
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getBattleDetail = async (battleId: number) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${SERVER}/battles/${battleId}`,
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
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

    // const TEMP_DUMMY: Vote = {
    //   title: '떠나 (Prod. PATEKO (파테코))',
    //   albumCoverUrl:
    //     'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg',
    //   selectedPostVoteCnt: 175,
    //   oppositePostVoteCnt: 253,
    // };

    if (response.data.success) {
      return response.data.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
};
