import { BattleMusic } from '@/components/post/battle/types';
import { useState } from 'react';

const useConfirmModal = () => {
  const [musicData, setMusicData] = useState<BattleMusic>({
    musicName: '',
    singer: '',
    thumbnailUrl: '',
    musicUrl: '',
  });
  const [isOpened, setIsOpened] = useState(false);

  const onClickPost = (musicInfo: BattleMusic) => {
    setIsOpened(true);
    setMusicData(musicInfo);
  };

  const onClickConfirmButton = async (setSelectedMyMusic?: React.Dispatch<React.SetStateAction<BattleMusic>>) => {
    setSelectedMyMusic?.(musicData);
    setIsOpened(false);
  };

  const onClickCancelButton = () => setIsOpened(false);

  return { musicData, isOpened, onClickPost, onClickConfirmButton, onClickCancelButton };
};

export default useConfirmModal;
