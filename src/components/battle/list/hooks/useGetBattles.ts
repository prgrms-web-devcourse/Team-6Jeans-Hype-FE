import { useQuery } from '@tanstack/react-query';

import { getBattleList } from '../api';
import { GenreName } from '../types';

export const useGetBattleList = (genre?: GenreName) => {
  return useQuery({
    queryKey: ['battleList_getBattleList', genre],
    queryFn: async () => {
      const data = await getBattleList();
      return data;
    },
  });
};
