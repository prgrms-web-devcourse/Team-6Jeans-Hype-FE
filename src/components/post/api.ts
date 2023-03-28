import { axiosInstance } from '@/api';

import { PostAPI } from './types';

export const getPostFeedData = async (genre: string) => {
  try {
    const { data } = await axiosInstance.request<PostAPI>({
      method: 'GET',
      url: `/posts`,
      params: {
        genre,
      },
    });

    if (data.success) {
      return data.data.posts;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
