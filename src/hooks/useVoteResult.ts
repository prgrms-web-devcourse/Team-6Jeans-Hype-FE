import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getBattleDeatil, getRandomBattle } from '@/components/battle/api';
import { Battles } from '@/components/battle/types';

interface SelectedBattle {
  battleId: number;
  votedPostId: number;
}

const useVoteResult = (initBattleId?: number) => {
  const {
    data: musicData,
    isLoading,
    refetch,
  } = useQuery<Battles>(['battleList'], () => (initBattleId ? getBattleDeatil(initBattleId) : getRandomBattle()), {
    onSuccess: () => {
      setIsLoadingState(true);
      setTimeout(() => {
        setIsLoadingState(false);
      }, 500);
    },
  });

  const [isLoadingState, setIsLoadingState] = useState<boolean>(isLoading);

  const [selectedBattle, setSelectedBattle] = useState<SelectedBattle>({
    battleId: -1,
    votedPostId: -1,
  });

  const [position, setPosition] = useState<'left' | 'right'>();

  const onClickMusic = (e: any, clickSide: 'left' | 'right', battleId: number, votedPostId: number) => {
    setPosition(clickSide);

    const { target } = e;

    if (target) {
      const parent = target.closest('.container');
      const newTarget = parent.firstChild;

      const savedClassName = newTarget.className;
      const savedHTML = newTarget.innerHTML;

      newTarget.className = `${savedClassName} active`;
      newTarget.innerHTML = '';

      setTimeout(() => {
        setSelectedBattle({ battleId, votedPostId });
      }, 400);

      if (initBattleId === undefined) {
        setTimeout(() => {
          refetch();
        }, 1700);

        setTimeout(() => {
          setSelectedBattle({
            battleId: -1,
            votedPostId: -1,
          });

          newTarget.className = savedClassName;
          newTarget.innerHTML = savedHTML;
        }, 1800);
      }
    }
  };

  const onClickSkip = () => {
    setIsLoadingState(true);
    refetch();
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  return { musicData, isLoadingState, selectedBattle, position, onClickMusic, onClickSkip };
};

export default useVoteResult;
