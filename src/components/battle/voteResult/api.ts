import { axiosInstance } from '@/api';

import { exceptList } from '../constants';

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
