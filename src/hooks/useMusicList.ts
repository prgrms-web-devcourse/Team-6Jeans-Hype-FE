import { TrackInfo } from '@/components/post/create/types';
import { debounce } from 'lodash';
import { useCallback, useRef, useState } from 'react';

const useMusicList = () => {
  const [tmpKeyword, setTmpKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedId, setSelectedId] = useState<string>('');

  const onChangeKeywordWithDebounce = debounce((keyword: string) => {
    setKeyword(keyword);
  }, 500);

  const onClickInMusicList = async (track: TrackInfo) => {
    const { hub } = track;

    setTmpKeyword('');
    setKeyword('');
    setSelectedId(hub.actions[0].id);
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
    selectedId,
    tmpKeyword,
    keyword,
    onChangeKeyword,
    onClickInMusicList,
  };
};

export default useMusicList;
