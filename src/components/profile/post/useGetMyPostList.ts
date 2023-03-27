import { useQuery } from '@tanstack/react-query';

import { getMyPostList } from './api';

export const useGetMyPostList = (genre?: string, memberId?: number) => {
  return useQuery({
    queryKey: ['myPostList', genre, memberId],
    queryFn: async () => {
      if (Number.isNaN(memberId)) {
        return await getMyPostList(genre);
      }
      return await getMyPostList(genre, memberId);
    },
    staleTime: 30000,
    cacheTime: 30000,
  });
};
