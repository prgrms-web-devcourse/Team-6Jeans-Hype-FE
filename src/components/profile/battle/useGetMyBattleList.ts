import { useQuery } from '@tanstack/react-query';

import { GenreName } from '@/components/battle/list/types';

import { getMyBattleList } from './api';

export const useGetMyBattleList = (options?: { genre?: GenreName; limit?: number; memberId?: number }) => {
  return useQuery({
    queryKey: ['battleList_getMyBattleList', options?.genre, options?.limit, options?.memberId],
    queryFn: async () => {
      const data = await getMyBattleList({ genre: options?.genre, limit: options?.limit, memberId: options?.memberId });
      return data;
    },
  });
};
