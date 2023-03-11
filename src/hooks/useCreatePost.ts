import { useState } from 'react';

import { Genre, Music } from '@/components/post/create/types';

const usePostCreate = () => {
  const [musicInfo, setMusicInfo] = useState<Music>({
    trackId: -1,
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined);
  const [description, setDescription] = useState<string>('');
  const [battleAvailability, setBattleAvailability] = useState<boolean>(false);

  const onChangeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name === 'battleAvailability') {
      setBattleAvailability((prev) => !prev);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'genre') {
      setSelectedGenre(value as Genre);
    }
  };

  const onChangeMusicInfo = (infos: Music) => {
    setMusicInfo(infos);
  };

  return {
    values: { musicInfo, selectedGenre, description, battleAvailability },
    onChangeValues,
    onChangeMusicInfo,
  };
};

export default usePostCreate;
