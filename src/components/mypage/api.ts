import { axiosInstance } from '@/api';

import { MyPostAPI } from './types';

export const getPostFeedLimit = async () => {
  try {
    const { data } = await axiosInstance.request<MyPostAPI>({
      method: 'GET',
      url: `/members/posts`,
      params: {
        limit: '2',
      },
    });

    if (data.success) {
      return data.data.myPosts;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
