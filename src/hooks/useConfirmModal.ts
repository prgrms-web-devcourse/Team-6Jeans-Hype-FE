import { useRouter } from 'next/router';
import { useState } from 'react';

interface MusicTitleSingerInfo {
  title: string;
  singer: string;
}

const useConfirmModal = () => {
  const [musicData, setMusicData] = useState<MusicTitleSingerInfo>({
    title: '',
    singer: '',
  });
  const [isOpened, setIsOpened] = useState(false);

  const router = useRouter();
  const { postId } = router.query;

  const onClickBattleButton = (musicInfo: MusicTitleSingerInfo) => {
    setIsOpened(true);
    setMusicData(musicInfo);
  };

  const onClickConfirmButton = async () => {
    // 대결 등록(POST)
    router.push(`/post/battle?postId=${postId}`);
  };

  const onClickCancelButton = () => setIsOpened(false);

  return { musicData, isOpened, onClickBattleButton, onClickConfirmButton, onClickCancelButton };
};

export default useConfirmModal;
