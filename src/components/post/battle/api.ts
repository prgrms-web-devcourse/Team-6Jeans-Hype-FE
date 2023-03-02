import { axiosInstance } from '@/api';
import { PostBattleAPI } from './types';

const SERVER = process.env.NEXT_PUBLIC_API_URL;
const TEMP_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjc3NDg1MTUwLCJleHAiOjE2NzgzNDkxNTB9.1UtakWRXOkrN-IGZ7V7fWh0YhC4WzBS6M31FxTnPceKLW-IqvD8sTVlQIDEDfmbqxDdqqWnOVH4i0i0k1KuYlg';

export const getPostBattleData = async (postId: number) => {
  try {
    const { data } = await axiosInstance.request<PostBattleAPI>({
      method: 'GET',
      url: `${SERVER}/posts/${postId}`,
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

export const createBattle = async (challengedPostId: number, challengingPostId: number) => {
  const body = {
    challengedPostId,
    challengingPostId,
  };

  try {
    const response = await axiosInstance.request({
      method: 'POST',
      url: `${SERVER}/battles`,
      data: { ...body },
    });

    if (response.data.success) {
      return response.data.success;
    } else {
      return false;
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
