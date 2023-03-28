import { useQuery } from '@tanstack/react-query';

import { GenreValue } from '@/components/battle/List_tmp/types';

import { BattleStatusValue } from './../../battle/types';
import { getMyBattleList } from './api';

export const useGetMyBattleList = (options?: {
  genre?: GenreValue;
  limit?: number;
  memberId?: number;
  status?: BattleStatusValue;
}) => {
  return useQuery({
    queryKey: ['battleList_getMyBattleList', options?.genre, options?.limit, options?.memberId, options?.status],
    queryFn: async () => {
      const data = await getMyBattleList({
        genre: options?.genre,
        limit: options?.limit,
        memberId: options?.memberId,
        status: options?.status,
      });
      return data;
    },
  });
};
