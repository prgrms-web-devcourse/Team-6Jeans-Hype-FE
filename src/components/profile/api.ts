import { axiosInstance } from '@/api';

import { tokenStorage } from '../../utils/localStorage';

export const getPostFeedLimit = async (memberId?: number) => {
  try {
    const { data } = await axiosInstance.request({
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
    const { data } = await axiosInstance.request({
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
    const { data } = await axiosInstance.request({
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
    const { data } = await axiosInstance.request({
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
    const { data } = await axiosInstance.request({
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

export const modifyUserImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);

    const { data } = await axiosInstance.request({
      method: 'POST',
      url: `/members/profile/image`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data.success;
  } catch (error) {
    console.error(error);
  }
};
