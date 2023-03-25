import { useQuery } from '@tanstack/react-query';

import { getLikePostList } from '../api';

export const useGetMyLikeList = (genre?: string, limit?: number) => {
  return useQuery({
    queryKey: ['myLikePostList', genre, limit],
    queryFn: async () => {
      const data = await getLikePostList(genre, limit);
      return data;
    },
    staleTime: 30000,
    cacheTime: 30000,
  });
};
