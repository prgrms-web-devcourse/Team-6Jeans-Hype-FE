import { useRef, useState } from 'react';

const useVoteResult = () => {
  const [visible, setVisible] = useState<boolean>();
  const refForMove = useRef<HTMLSpanElement>(null);

  const onVote = () => {
    setVisible((prev) => !prev);

    setTimeout(() => {
      setVisible((prev) => !prev);
    }, 1800);
  };

  const onClickMusic = () => {
    const target = refForMove.current;

    if (target) {
      const { className } = target;

      target.className = `${className} active`;

      setTimeout(() => {
        onVote();
      }, 200);

      setTimeout(() => {
        target.className = `${className}`;
      }, 1800);
    }
  };

  return { visible, refForMove, onVote, onClickMusic };
};

export default useVoteResult;
