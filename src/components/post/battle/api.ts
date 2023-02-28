import axios from 'axios';

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export const getPostBattleData = async (postId: number) => {
  try {
    const response = await axios.get(`${SERVER}/posts/${postId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.data.success) {
      return response.data.data;
    } else {
      return [];
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
