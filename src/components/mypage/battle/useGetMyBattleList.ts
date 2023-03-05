import { useQuery } from '@tanstack/react-query';

import { GenreName } from '@/components/battle/list/types';

import { getMyBattleList } from './api';

export const useGetMyBattleList = (genre?: GenreName) => {
  return useQuery({
    queryKey: ['battleList_getMyBattleList', genre],
    queryFn: async () => {
      const data = await getMyBattleList();
      return data;
    },
  });
};
