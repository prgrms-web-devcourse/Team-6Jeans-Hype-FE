import { axiosInstance } from '@/api';

import { GenreTop10PostAPI } from './type';

export const getGenreTop10Data = async (genre: string) => {
  try {
    const { data } = await axiosInstance.request<GenreTop10PostAPI>({
      method: 'GET',
      url: `/posts/likes/top`,
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
