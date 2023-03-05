import { axiosInstance } from '@/api';
import { Battles } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_URL;
const exceptList: number[] = [];
let prevGenre: string = '';

export const getRandomBattle = async (selectedGenre: string) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `${SERVER}/battles/details`,
    });

    if (response.data.success) {
      const { battles } = response.data.data;

      const filteredBattles =
        selectedGenre === 'ALL'
          ? battles
          : battles.filter((battle: Battles) => battle.battleGenre.genreValue === selectedGenre);

      if (filteredBattles.length) {
        const dataLength = filteredBattles.length;

        if (exceptList.length === dataLength || prevGenre !== selectedGenre) {
          exceptList.length = 0;
          prevGenre = selectedGenre;
        }

        let targetNumber = Math.floor(Math.random() * dataLength);

        while (exceptList.indexOf(targetNumber) !== -1) {
          targetNumber = Math.floor(Math.random() * dataLength);
        }

        exceptList.push(targetNumber);

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

    if (response.data.success) {
      return response.data.data;
    } else {
      return {};
    }
  } catch (error) {
    console.error(error);
  }
};
