import AlbumPoster from '@/components/common/AlbumPoster';
import Genres from '@/components/common/Genres';
import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
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

  return (
    <Container>
      <Title>이런 곡은 어때요?</Title>
      <Genres onChange={onChange} shouldNeedAll />
      <Posts>
        {genreTop10Post?.map(({ postId, music: { albumCoverUrl, title, singer } }) => (
          <Post key={postId}>
            <AlbumPoster lazy={true} size={12.5} src={albumCoverUrl} />
            <TitleSinger>
              <div>{title}</div>
              <div>{singer}</div>
            </TitleSinger>
          </Post>
        ))}
      </Posts>
    </Container>
  );
}

export default GenreTop10Post;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.3rem;

  color: ${COLOR.deepBlue};

  margin-bottom: 1rem;
`;

const Posts = styled.div`
  display: flex;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }

  margin-top: 1rem;
`;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0.5rem;

  width: 12.5rem;
`;

const TitleSinger = styled.div`
  margin: 1rem 0 0 0.5rem;

  & div:first-of-type {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.8rem;

    color: ${COLOR.deepBlue};
  }

  & div:last-of-type {
    font-weight: 500;
    font-size: 0.9rem;
    line-height: 1.4rem;

    color: ${COLOR.gray};
  }
`;
