import { useQuery } from '@tanstack/react-query';

import { getMyPostList } from './api';

export const useGetMyPostList = (genre?: string) => {
  return useQuery({
    queryKey: ['myPostList', genre],
    queryFn: async () => {
      const data = await getMyPostList(genre);
      return data;
    },
    staleTime: 30000,
    cacheTime: 30000,
  });
};
