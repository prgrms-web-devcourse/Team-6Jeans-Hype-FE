import { axiosInstance } from '@/api';

export const getGenres = async () => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/genres`,
    });

    if (response.data.success) {
      return response.data.data.genres;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
