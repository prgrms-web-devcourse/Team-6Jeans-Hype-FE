import { useRouter } from 'next/router';

import BattleMusic from '../BattleMusic';
import { BattleDetail } from '../types';

interface Prop {
  music: BattleDetail;
  moving: 'left' | 'right';
  onClick: (moving: 'left' | 'right', musicId: number | undefined) => void;
}

function Moving({ music, moving, onClick }: Prop) {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = (e: React.ChangeEvent<HTMLElement>) => {
    const { target } = e;

    onClick(moving, music.postId);

    if (target) {
      const parent = target.closest('.container');
      const newTarget = parent?.firstElementChild;

      if (newTarget) {
        const savedClassName = newTarget.className;
        const savedHTML = newTarget.innerHTML;

        newTarget.className = `${savedClassName} active`;
        newTarget.innerHTML = '';

        if (id === undefined) {
          setTimeout(() => {
            newTarget.className = savedClassName;
            newTarget.innerHTML = savedHTML;
          }, 1700);
        }
      }
    }
  };

  return <BattleMusic music={music.music} moving={moving} handleClick={(e) => handleClick(e)} />;
}

export default Moving;
