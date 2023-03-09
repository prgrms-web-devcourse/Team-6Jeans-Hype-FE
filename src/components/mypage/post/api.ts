import { axiosInstance } from '@/api';

import { MyPostAPI } from '../types';

export const getMyPostList = async (genre?: string) => {
  try {
    const { data } = await axiosInstance.request<MyPostAPI>({
      method: 'GET',
      url: `/members/posts${genre ? `?genre=${genre}` : ''}`,
    });
    if (data.success) {
      return data.data.myPosts;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};
