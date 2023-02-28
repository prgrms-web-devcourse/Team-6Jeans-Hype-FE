import { useRef, useState } from 'react';

const useVoteResult = () => {
  const [visible, setVisible] = useState<boolean>();

  const onVote = () => {
    setVisible((prev) => !prev);

    setTimeout(() => {
      setVisible((prev) => !prev);
    }, 1800);
  };

  const onClickMusic = (e: any) => {
    const { target } = e;

    if (target) {
      const parent = target.closest('.container');
      const newTarget = parent.firstChild;
      const tmpClassName = newTarget.className;

      newTarget.className = `${tmpClassName} active`;

      setTimeout(() => {
        onVote();
      }, 200);

      setTimeout(() => {
        newTarget.className = `${tmpClassName}`;
      }, 1800);
    }
  };

  return { visible, onClickMusic };
};

export default useVoteResult;
