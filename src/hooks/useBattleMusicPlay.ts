import { useState } from 'react';

const useBattleMusicPlay = () => {
  const [isLeftMusicPlay, setIsLeftMusicPlay] = useState(false);
  const [isRightMusicPlay, setIsRightMusicPlay] = useState(false);

  const clickLeftButton = () => {
    setIsLeftMusicPlay((prev) => !prev);
    setIsRightMusicPlay(false);
  };

  const clickRightButton = () => {
    setIsRightMusicPlay((prev) => !prev);
    setIsLeftMusicPlay(false);
  };

  return { isLeftMusicPlay, isRightMusicPlay, clickLeftButton, clickRightButton };
};

export default useBattleMusicPlay;
