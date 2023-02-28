import axios from 'axios';

const SERVER = process.env.NEXT_PUBLIC_API_URL;

const TEMP_TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNjc3NDg1MTUwLCJleHAiOjE2NzgzNDkxNTB9.1UtakWRXOkrN-IGZ7V7fWh0YhC4WzBS6M31FxTnPceKLW-IqvD8sTVlQIDEDfmbqxDdqqWnOVH4i0i0k1KuYlg';

export const getMyBattleListData = async (genre: string) => {
  try {
    const response = await axios.get(`${SERVER}/posts/battle/candidates`, {
      params: { genre },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TEMP_TOKEN}`,
      },
    });

    if (response.data.success) {
      return response.data.data.posts;
    } else {
      return [];
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
