import { useQuery } from '@tanstack/react-query';

import { getMyPostList } from './api';

export const useGetMyPostList = (genre?: string, memberId?: number) => {
  return useQuery({
    queryKey: ['myPostList', genre, memberId],
    queryFn: async () => {
      if (Number.isNaN(memberId)) {
        const data = await getMyPostList(genre);
        return data;
      }
      const data = await getMyPostList(genre, memberId);
      return data;
    },
    staleTime: 30000,
    cacheTime: 30000,
  });
};
