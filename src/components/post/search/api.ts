import { axiosInstance } from '@/api';

import { Music } from '../create/types';

export const getMusicData = async (keyword: string) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/music/search`,
      params: {
        term: keyword,
      },
    });

    if (data.success) {
      const filteredData = data.data.results.filter((result: Music) => result.artistName !== '코케');

      return filteredData;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
