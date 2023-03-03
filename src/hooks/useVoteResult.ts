import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getBattle } from '@/components/battle/api';
import { Battles } from '@/components/battle/types';

interface Data {
  data: Battles;
}

const useVoteResult = () => {
  const {
    data: musicData,
    isLoading,
    refetch,
  } = useQuery<Battles>(['battleList'], getBattle, {
    onSuccess: () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    },
  });

  const [loading, setLoading] = useState<boolean>(isLoading);

  const [resultVisible, setResultVisible] = useState<boolean>(false);

  const [position, setPosition] = useState<'left' | 'right'>();

  const onClickMusic = (e: any, clickSide: 'left' | 'right') => {
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
        setResultVisible(true);
      }, 400);

      setTimeout(() => {
        refetch();
      }, 1700);

      setTimeout(() => {
        setResultVisible(false);

        newTarget.className = savedClassName;
        newTarget.innerHTML = savedHTML;
      }, 1800);
    }
  };

  const onClickSkip = () => {
    setLoading(true);
    refetch();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return { musicData, loading, resultVisible, position, onClickMusic, onClickSkip };
};

export default useVoteResult;
