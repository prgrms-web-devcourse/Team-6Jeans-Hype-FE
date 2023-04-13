import { axiosInstance } from '@/api';

import { tokenStorage } from '../../utils/localStorage';

export const getUserRanking = async (isLimit: boolean) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/members/ranking${isLimit ? '/preview' : ''}`,
    });

    if (data.success) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMyRanking = async () => {
  try {
    const token = tokenStorage.get();

    if (token !== null) {
      const { data } = await axiosInstance.request({
        method: 'GET',
        url: `members/profile`,
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (data.success) {
        return data.data;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};
