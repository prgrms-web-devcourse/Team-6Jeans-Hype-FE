import { axiosInstance } from '@/api';

import { MyPostAPI } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export const getPostFeedLimit = async () => {
  try {
    const { data } = await axiosInstance.request<MyPostAPI>({
      method: 'GET',
      url: `${SERVER}/members/posts`,
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
