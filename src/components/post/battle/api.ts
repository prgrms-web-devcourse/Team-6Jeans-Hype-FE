import { axiosInstance } from '@/api';
import { tokenStorage } from '@/components/login/utils/localStorage';
import { PostBattleAPI } from './types';

export const getPostBattleData = async (postId: number) => {
  try {
    const { data } = await axiosInstance.request<PostBattleAPI>({
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
    const response = await axiosInstance.request({
      method: 'POST',
      url: `/battles`,
      data: {
        challengedPostId,
        challengingPostId,
      },
      params: {
        Authorization: `Bearer ${tokenStorage.get()}`,
      },
    });

    if (response.data.success) {
      return response.data.success;
    } else {
      return false;
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
