import { axiosInstance } from '@/api';

import { MyBattlePosAPI } from '../types';

export const getMyBattleListData = async (selectedOpponentMusicId: string) => {
  try {
    const { data } = await axiosInstance.request<MyBattlePosAPI>({
      method: 'GET',
      url: `/posts/battle/${selectedOpponentMusicId}/candidates`,
    });

    if (data.success) {
      return data.data.posts;
    } else {
      return [];
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
