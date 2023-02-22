import { KeywordInfo, MusicInfo } from '@/components/post/create/types';
import { useCallback, useState } from 'react';

const useMusicList = () => {
  const [keywords, setKeywords] = useState<KeywordInfo>({
    trackName: '',
    artistName: '',
  });
  const [tmpKeywords, setTmpKeywords] = useState<KeywordInfo>({
    trackName: '',
    artistName: '',
  });
  const [selectedMusic, setSelectedMusic] = useState<MusicInfo>({
    trackId: '',
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setTmpKeywords({ ...tmpKeywords, [name]: value });
    },
    [tmpKeywords],
  );

  const onClickInSearchButton = useCallback(async () => {
    setKeywords({ ...tmpKeywords });
  }, [tmpKeywords]);

  const onClickInMusicList = async (music: MusicInfo) => {
    setKeywords({
      trackName: '',
      artistName: '',
    });
    setTmpKeywords({
      trackName: '',
      artistName: '',
    });

    setSelectedMusic(music);
  };

  return {
    selectedMusic,
    keywords,
    tmpKeywords,
    onChangeKeyword,
    onClickInSearchButton,
    onClickInMusicList,
  };
};

export default useMusicList;
