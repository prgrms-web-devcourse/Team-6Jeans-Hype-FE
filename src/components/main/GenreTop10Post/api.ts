import { axiosInstance } from '@/api';

export const getGenreTop10Data = async (genre: string) => {
  try {
    const { data } = await axiosInstance.request({
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
