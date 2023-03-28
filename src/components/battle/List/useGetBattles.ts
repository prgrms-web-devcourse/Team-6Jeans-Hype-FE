import { useQuery } from '@tanstack/react-query';

import { BattleStatusValue } from '../types';
import { getBattleList } from './api';
import { GenreValue } from './types';

export const useGetBattleList = ({ genre, status }: { genre?: GenreValue; status: BattleStatusValue }) => {
  return useQuery({
    queryKey: ['battleList_getBattleList', genre, status],
    queryFn: async () => {
      const data = await getBattleList({ genre, status });
      return data;
    },
    staleTime: 30000,
    cacheTime: 30000,
  });
};
