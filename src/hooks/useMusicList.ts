import { Music } from '@/components/post/create/types';
import { useCallback, useState } from 'react';

const useMusicList = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [tmpKeyword, setTmpKeyword] = useState<string>('');
  const [selectedMusic, setSelectedMusic] = useState<Music>({
    trackId: '',
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });

  const onChangeKeyword = 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setTmpKeyword(value);
    }
    

  const onClickInSearchButton = useCallback(async () => {
    setKeyword(tmpKeyword);
  }, [tmpKeyword]);

  const onClickInMusicList = async (music: Music) => {
    setKeyword('');
    setTmpKeyword('');
    setSelectedMusic(music);
  };

  return {
    selectedMusic,
    keyword,
    tmpKeyword,
    onChangeKeyword,
    onClickInSearchButton,
    onClickInMusicList,
  };
};

export default useMusicList;
