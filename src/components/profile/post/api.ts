import { axiosInstance } from '@/api';

import { MyPostAPI } from '../types';

export const getMyPostList = async (genre?: string, memberId?: number) => {
  try {
    const { data } = await axiosInstance.request<MyPostAPI>({
      method: 'GET',
      url: `/members/posts`,
      params: { genre, memberId },
    });
    if (data.success) {
      return data.data.myPosts;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};
