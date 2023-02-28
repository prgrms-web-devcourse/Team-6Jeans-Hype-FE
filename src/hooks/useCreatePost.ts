import { useState } from 'react';

import { createPost } from '@/components/post/api';
import { Genre, Music, Values } from '@/components/post/create/types';

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const postInfo: Values = {
      musicInfo,
      selectedGenre,
      description,
      battleAvailability,
    };
    if (selectedGenre === undefined) {
      alert('장르를 선택해주세요');
    } else {
      const response = await createPost(postInfo);
      if (response) {
        //go to post-detail
      }
    }
  };

  return {
    values: { musicInfo, selectedGenre, description, battleAvailability },
    onChangeValues,
    onChangeMusicInfo,
    onSubmit,
  };
};

export default usePostCreate;
