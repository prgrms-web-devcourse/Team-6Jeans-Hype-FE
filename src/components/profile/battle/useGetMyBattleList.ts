import { useQuery } from '@tanstack/react-query';

import { GenreValue } from '@/components/battle/list/types';

import { getMyBattleList } from './api';

export const useGetMyBattleList = (options?: { genre?: GenreValue; limit?: number; memberId?: number }) => {
  return useQuery({
    queryKey: ['battleList_getMyBattleList', options?.genre, options?.limit, options?.memberId && options?.memberId],
    queryFn: async () => {
      const data = await getMyBattleList({
        genre: options?.genre,
        limit: options?.limit,
        memberId: options?.memberId,
      });
      return data;
    },
  });
};
