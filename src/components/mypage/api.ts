import { axiosInstance } from '@/api';

import { MyPostAPI, ProfileAPI } from './types';

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
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const getUserProfile = async () => {
  try {
    const { data } = await axiosInstance.request<ProfileAPI>({
      method: 'GET',
      url: `members/profile`,
    });

    if (data.success) {
      return data.data;
    }
  } catch (error) {
    console.error(error);
  }
};
