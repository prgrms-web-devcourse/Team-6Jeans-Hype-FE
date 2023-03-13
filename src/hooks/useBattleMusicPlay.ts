import { useState } from 'react';

const useBattleMusicPlay = () => {
  const [isLeftMusicPlay, setIsLeftMusicPlay] = useState(true);
  const [isRightMusicPlay, setIsRightMusicPlay] = useState(true);

  const clickLeftButton = () => {
    setIsLeftMusicPlay((prev) => !prev);
    setIsRightMusicPlay(true);
  };

  const clickRightButton = () => {
    setIsRightMusicPlay((prev) => !prev);
    setIsLeftMusicPlay(true);
  };

  const init = () => {
    setIsLeftMusicPlay(true);
    setIsRightMusicPlay(true);
  };

  return { isLeftMusicPlay, isRightMusicPlay, clickLeftButton, clickRightButton, init };
};

export default useBattleMusicPlay;
