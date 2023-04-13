import { axiosInstance } from '@/api';

export const getMyPostList = async (genre?: string, memberId?: number) => {
  try {
    const { data } = await axiosInstance.request({
      method: 'GET',
      url: `/members/posts`,
      params: { genre, memberId },
    });
    if (data.success) {
      return data.data.myPosts;
    }
    return [];
  } catch (error) {
    console.error(error);
  }
};
