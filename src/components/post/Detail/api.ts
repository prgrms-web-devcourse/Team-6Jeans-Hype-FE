import { axiosInstance } from '@/api';

export const getPostDetailData = async (postId: number) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/posts/${postId}`,
    });

    if (data.success) {
      return data.data;
    } else {
      return null;
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};

export const getUserLikeStatus = async (postId: string, token: string) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/posts/${postId}/isLike`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (data.success) {
      return data.data.isLiked;
    } else {
      return null;
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};

export const changeLikeStatus = async (postId: string) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'POST',
      url: `/posts/${postId}/like`,
    });

    if (data.success) {
      return data.data.hasLike;
    } else {
      return false;
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
