import axios, { AxiosError } from 'axios';

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
    }
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (axios.isAxiosError(errors) && errors.response?.data.message) {
      throw new Error(`${errors.response?.data.message}`);
    } else {
      throw new Error('데이터 요청 실패');
    }
  }
};
