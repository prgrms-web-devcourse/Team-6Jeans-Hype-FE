import { useQuery } from '@tanstack/react-query';

import { getBattleDetail, getRandomBattle } from '../api';
import { Battles } from '../types';

interface Props {
  initBattleId?: number;
  selectedGenre: string;
}

export const useGetBattle = ({ initBattleId, selectedGenre }: Props) => {
  return useQuery<Battles>(['battleList', selectedGenre, initBattleId], () =>
    initBattleId ? getBattleDetail(initBattleId) : getRandomBattle(selectedGenre),
  );
};
