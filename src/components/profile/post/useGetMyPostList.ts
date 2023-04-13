import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@/components/post/types';

import { getMyPostList } from './api';

export const useGetMyPostList = (genre?: string, memberId?: number) => {
  return useQuery<PostInfo[]>({
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
