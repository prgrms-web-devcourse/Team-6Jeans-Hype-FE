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

      const savedClassName = newTarget.className;
      const savedHTML = newTarget.innerHTML;

      newTarget.className = `${savedClassName} active`;
      newTarget.innerHTML = '';

      setTimeout(() => {
        onVote();
      }, 200);

      setTimeout(() => {
        newTarget.className = savedClassName;
        newTarget.innerHTML = savedHTML;
      }, 1800);
    }
  };

  return { visible, onClickMusic };
};

export default useVoteResult;
