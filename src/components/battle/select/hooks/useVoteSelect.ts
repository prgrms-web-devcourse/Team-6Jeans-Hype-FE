import { useState } from 'react';

import { SelectedBattle } from '../../types';
import { useGetBattle } from './useGetBattle';

const useVoteSelect = (initBattleId?: number) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('ALL');
  const [position, setPosition] = useState<'left' | 'right'>();
  const [isLoadingState, setIsLoadingState] = useState<boolean>(false);
  const [selectedBattle, setSelectedBattle] = useState<SelectedBattle>({
    battleId: 0,
    votedPostId: 0,
  });

  const { data: musicData, refetch } = useGetBattle({ initBattleId, selectedGenre });

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingState(true);
    setSelectedGenre(e.target.value);
    setTimeout(() => {
      setIsLoadingState(false);
    }, 500);
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
              battleId: 0,
              votedPostId: 0,
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

  return {
    musicData,
    isLoadingState,
    selectedBattle,
    position,
    onClickGenre,
    onClickMusic,
    onClickSkip,
  };
};

export default useVoteSelect;
