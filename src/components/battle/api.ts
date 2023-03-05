import axios from 'axios';

import { axiosInstance } from '@/api';

import { TEMP_DUMMY } from './temp_dummy';
import { Battles, Vote } from './types';

export const getRandomBattle = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/battles`,
    });

    if (response.data.success) {
      response.data.data.battles = TEMP_DUMMY;
      const { battles } = response.data.data;
      const dataLength = battles.length;
      const targetNumber = Math.floor(Math.random() * dataLength);
      const targetData = battles[targetNumber];

      return targetData;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
};

export const getBattleDeatil = async (battleId: number) => {
  try {
    // const response = await axiosInstance.request({
    //   method: 'GET',
    //   url: `${SERVER}/battles/${battleId}`,
    // });

    //임시 더미
    const tmp = TEMP_DUMMY.find((battle: any) => battle.battleId === battleId);
    return tmp;

    // if (response.data.success) {
    //   response.data.data.battles = TEMP_DUMMY;
    //   const { battles } = response.data.data;
    //   const targetData = battles.find((battle: Battles) => battle.battleId === battleId);

    //   return targetData;
    // } else {
    //   return {};
    // }
  } catch (error) {
    console.error(error);
  }
};

export const createBattleVote = async (battleId: number, votedPostId: number) => {
  try {
    // const response = await axiosInstance.request({
    //   method: 'POST',
    //   url: `${SERVER}/battles/vote`,
    //   data: {
    //     battleId,
    //     votedPostId,
    //   },
    // });

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
