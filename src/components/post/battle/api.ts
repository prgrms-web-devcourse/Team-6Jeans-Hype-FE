import axios, { AxiosError } from 'axios';

import { axiosInstance } from '@/api';

export const getPostBattleData = async (postId: number) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/posts/${postId}`,
    });

    if (data.success) {
      return data.data;
    } else {
      return null;
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};

export const createBattle = async (challengedPostId: number, challengingPostId: number) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'POST',
      url: `/battles`,
      data: {
        challengedPostId,
        challengingPostId,
      },
      // params: {
      //   Authorization: `Bearer ${tokenStorage.get()}`,
      // },
    });

    if (data.success) {
      return { success: data.success, message: data.message };
    }
  } catch (err) {
    const errors = err as Error | AxiosError;

    if (axios.isAxiosError(errors) && errors.response?.data.message) {
      return { success: errors.response?.data.success, message: errors.response?.data.message };
    } else {
      return { success: false, message: '데이터 요청 실패' };
    }
  }
};
