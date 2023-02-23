import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

const useSearchMusics = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>('');
  const [tmpKeyword, setTmpKeyword] = useState<string>('');

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTmpKeyword(value);
  };

  const onClickInSearchButton = useCallback(async () => {
    setKeyword(tmpKeyword);
  }, [tmpKeyword]);

  const onClickInMusicList = (trackId: string) => {
    setKeyword('');
    setTmpKeyword('');

    router.push(`/post/create?trackId=${trackId}&keyword=${keyword}`);
  };

  return {
    keyword,
    tmpKeyword,
    onChangeKeyword,
    onClickInSearchButton,
    onClickInMusicList,
  };
};

export default useSearchMusics;
