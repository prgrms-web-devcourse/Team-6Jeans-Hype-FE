import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getBattleDetail, getRandomBattle } from '@/components/battle/api';
import { Battles } from '@/components/battle/types';

interface SelectedBattle {
  battleId: number;
  votedPostId: number;
}

const useVoteResult = (initBattleId?: number) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const {
    data: musicData,
    isLoading,
    refetch,
  } = useQuery<Battles>(
    ['battleList', selectedGenre],
    () => (initBattleId ? getBattleDetail(initBattleId) : getRandomBattle(selectedGenre)),
    {
      onSuccess: () => {
        setIsLoadingState(true);
        setTimeout(() => {
          setIsLoadingState(false);
        }, 500);
      },
    },
  );

  const [position, setPosition] = useState<'left' | 'right'>();
  const [isLoadingState, setIsLoadingState] = useState<boolean>(isLoading);
  const [selectedBattle, setSelectedBattle] = useState<SelectedBattle>({
    battleId: -1,
    votedPostId: -1,
  });

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingState(true);
    setSelectedGenre(e.target.value);
  };

  const onClickMusic = (
    e: React.ChangeEvent<HTMLElement>,
    clickSide: 'left' | 'right',
    battleId: number,
    votedPostId: number,
  ) => {
    setPosition(clickSide);

    const { target } = e;

    if (target) {
      const parent = target.closest('.container');
      const newTarget = parent?.firstElementChild;

      if (newTarget) {
        const savedClassName = newTarget.className;
        const savedHTML = newTarget.innerHTML;

        newTarget.className = `${savedClassName} active`;
        newTarget.innerHTML = '';

        setSelectedBattle({ battleId, votedPostId });

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
    }
  };

  const onClickSkip = () => {
    setIsLoadingState(true);
    refetch();
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
  };

  return { musicData, isLoadingState, selectedBattle, position, onClickGenre, onClickMusic, onClickSkip };
};

export default useVoteResult;
