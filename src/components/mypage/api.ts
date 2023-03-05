import { axiosInstance } from '@/api';

import { MyBattleAPI, MyPostAPI, ProfileAPI } from './types';

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

export const getBattlesLimit = async () => {
  try {
    const { data } = await axiosInstance.request<MyBattleAPI>({
      method: 'GET',
      url: `/members/battles`,
      params: {
        limit: '2',
      },
    });

    if (data.success) {
      return data.data.battles;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
