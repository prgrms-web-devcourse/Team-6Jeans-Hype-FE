import { axiosInstance } from '@/api';

import { tokenStorage } from '../../utils/localStorage';
import { MyBattleAPI, MyPostAPI, ProfileAPI } from './types';

export const getPostFeedLimit = async (memberId?: number) => {
  try {
    const { data } = await axiosInstance.request<MyPostAPI>({
      method: 'GET',
      url: `/members/posts${memberId ? `?memberId=${memberId}` : ''}`,
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

export const getLikePostList = async (genre?: string, limit?: number) => {
  try {
    const { data } = await axiosInstance.request<MyPostAPI>({
      method: 'GET',
      url: `/members/likes`,
      params: {
        genre,
        limit,
      },
      headers: {
        Authorization: `Bearer ${tokenStorage.get()}`,
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

export const getUserProfile = async (memberId?: number) => {
  try {
    const { data } = await axiosInstance.request<ProfileAPI>({
      method: 'GET',
      url: `members/profile${memberId ? `?memberId=${memberId}` : ''}`,
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
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};

export const modifyUserName = async (name: string) => {
  try {
    const { data } = await axiosInstance.request<MyBattleAPI>({
      method: 'POST',
      url: `/members/profile/nickname`,
      data: {
        nickname: name,
      },
    });

    return data.success;
  } catch (error) {
    console.error(error);
  }
};
