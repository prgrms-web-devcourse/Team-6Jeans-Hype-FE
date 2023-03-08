import Genres from '@/components/common/Genres';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getGenreTop10Data } from './api';

function GenreTop10Post() {
  const [genre, setGenre] = useState('');

  const { data: genreTop10Post, isLoading } = useQuery(['main', 'genreTop10', genre], () => {
    return getGenreTop10Data(genre);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };

  console.log(genreTop10Post);

  return (
    <div>
      <Genres onChange={onChange} />
    </div>
  );
}

export default GenreTop10Post;
