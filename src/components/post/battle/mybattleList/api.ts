import { axiosInstance } from '@/api';

import { MyBattlePosAPI } from '../types';

export const getMyBattleListData = async (selectedOpponentMusicId: string) => {
  try {
    const { data } = await axiosInstance.request<MyBattlePosAPI>({
      method: 'GET',
      url: `/posts/battle/${selectedOpponentMusicId}/candidates`,
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc4MTc0MzYzLCJleHAiOjE2NzkwMzgzNjN9.5Vt-z-oEXA2-XnrQ0pQPn8OVNAPiTL9OunZcgX1H60hJOYbLx0Zwcv3zaOs_4VXpqGOi1CT2VOIwJXHVILfjlQ`,
      },
    });

    if (data.success) {
      return data.data.posts;
    } else {
      return [];
    }
  } catch {
    throw new Error('데이터 요청 실패');
  }
};
