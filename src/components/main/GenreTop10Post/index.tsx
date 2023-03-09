import Genres from '@/components/common/Genres';
import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getGenreTop10Data } from './api';
import MobilePosts from './MobilePosts';

function GenreTop10Post() {
  const router = useRouter();

  const [genre, setGenre] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  const { data: genreTop10Post } = useQuery(['main', 'genreTop10', genre], () => {
    return getGenreTop10Data(genre);
  });

  return (
    <>
      <Genres onChange={onChange} shouldNeedAll />
      <Title>이런 곡은 어때요?</Title>
      {genreTop10Post && <MobilePosts genreTop10Post={genreTop10Post} navigatePostDetail={navigatePostDetail} />}
    </>
  );
}

export default GenreTop10Post;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.3rem;
  color: ${COLOR.deepBlue};
  margin-bottom: 1rem;
`;
