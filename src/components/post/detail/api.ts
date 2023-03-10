import { axiosInstance } from '@/api';

import { PostDetailAPI, UserIsLikeAPI } from './types';

export const getPostDetailData = async (postId: number) => {
  try {
    const { data } = await axiosInstance.request<PostDetailAPI>({
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

export const getUserLikeStatus = async (postId: string, token: string) => {
  try {
    const { data } = await axiosInstance.request<UserIsLikeAPI>({
      method: 'GET',
      url: `/posts/${postId}/isLike`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
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
