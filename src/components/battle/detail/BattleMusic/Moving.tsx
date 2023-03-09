import { useRouter } from 'next/router';

import { BattleDetail } from '../../types';
import BattleMusic from './index';

interface Prop {
  music: BattleDetail;
  moving: 'left' | 'right';
  onClick: (moving: 'left' | 'right', musicId: number | undefined) => void;
}

function Moving(prop: Prop) {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = (e: React.ChangeEvent<HTMLElement>) => {
    const { target } = e;

    prop.onClick(prop.moving, prop.music.postId);

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
          setTimeout(() => {
            console.log('1.7초 후 refetch하기');
          }, 1800);
        }
      }
    }
  };

  return <BattleMusic handleClick={(e) => handleClick(e)} {...prop} />;
}

export default Moving;
