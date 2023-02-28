import { useState } from 'react';

const useVoteResult = () => {
  const [visible, setVisible] = useState<boolean>();

  const onClick = () => {
    setVisible((prev) => !prev);

    setTimeout(() => {
      setVisible((prev) => !prev);
    }, 3000);
  };

  return { visible, onClick };
};

export default useVoteResult;
