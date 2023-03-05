import { axiosInstance } from '@/api';

import { PostDetailAPI } from './types';

export const getPostDetailData = async (postId: number) => {
  try {
    const { data } = await axiosInstance.request<PostDetailAPI>({
      method: 'GET',
      url: `$/posts/${postId}`,
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
