import { MusicInfo } from '@/components/post/create/types';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import usePostCreate from './useCreatePost';

const useMusicList = () => {
  const [tmpKeyword, setTmpKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedMusic, setSelectedMusic] = useState<MusicInfo>({
    trackId: '',
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });

  const onChangeKeywordWithDebounce = useMemo(
    () =>
      debounce((keyword: string) => {
        setKeyword(keyword);
      }, 500),
    [keyword],
  );

  const onClickInMusicList = async (music: MusicInfo) => {
    setTmpKeyword('');
    setKeyword('');
    setSelectedMusic(music);
  };

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setTmpKeyword(value);

      onChangeKeywordWithDebounce(value);
    },
    [keyword],
  );

  return {
    selectedMusic,
    tmpKeyword,
    keyword,
    onChangeKeyword,
    onClickInMusicList,
  };
};

export default useMusicList;
