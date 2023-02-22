import { MusicInfo, ValuesType } from '@/components/post/create/types';
import { useCallback, useState } from 'react';

const usePostCreate = () => {
  const [musicInfo, setMusicInfo] = useState<MusicInfo>({
    trackId: '',
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });
  const [description, setDescription] = useState<string>('');
  const [battleAvailability, setBattleAvailability] = useState<boolean>(false);

  const onChangeValues = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value, name } = e.target;
      if (name === 'battleAvailability') {
        setBattleAvailability((prev) => !prev);
      } else if (name === 'description') {
        setDescription(value);
      }
    },
    [description, battleAvailability],
  );

  const onChangeMusicInfo = useCallback(
    (infos: MusicInfo) => {
      setMusicInfo(infos);
    },
    [musicInfo],
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postInfo: ValuesType = {
      musicInfo,
      description,
      battleAvailability,
    };
    console.log(postInfo);
  };

  return { values: { musicInfo, description, battleAvailability }, onChangeValues, onChangeMusicInfo, onSubmit };
};

export default usePostCreate;
