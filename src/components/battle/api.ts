import { axiosInstance } from '@/api';

import { Battles } from './types';

const exceptList: number[] = [];
let prevGenre = '';

export const getRandomBattle = async (selectedGenre: string) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/battles/details`,
    });

    if (data.success) {
      const { battles } = data.data;

      if (selectedGenre !== prevGenre || exceptList.length === battles.length) {
        exceptList.length = 0;
        prevGenre = selectedGenre;
      }

      const filteredByGenreBattles =
        selectedGenre === 'ALL'
          ? battles
          : battles.filter((battle: Battles) => battle.battleGenre.genreValue === selectedGenre);

      const filteredBattles = filteredByGenreBattles.filter((battle: Battles) => !exceptList.includes(battle.battleId));

      if (filteredBattles.length) {
        const targetNumber = Math.floor(Math.random() * filteredBattles.length);

        exceptList.push(filteredBattles[targetNumber].battleId);

        return filteredBattles[targetNumber];
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
      url: `/battles/${battleId}`,
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
    const { data } = await axiosInstance.request({
      method: 'POST',
      url: `/battles/vote`,
      data: {
        battleId,
        votedPostId,
      },
    });

    if (data.success) {
      exceptList.length = 0;
      return data.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
};
