import { useRouter } from 'next/router';

import { SelectedBattle } from '../../types';
import BattleMusic from './index';

interface Prop {
  music: BattleMusic;
  moving: 'left' | 'right';
}

function Moving(prop: Prop) {
  const router = useRouter();
  const { id } = router.query;

  const handleClick = (e: React.ChangeEvent<HTMLElement>) => {
    const { target } = e;

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
          }, 1800);
        }
      }
    }
  };

  return <BattleMusic handleClick={(e) => handleClick(e)} {...prop} />;
}

export default Moving;
