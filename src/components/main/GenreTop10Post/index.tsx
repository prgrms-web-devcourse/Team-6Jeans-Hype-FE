import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import AlbumPoster from '@/components/common/AlbumPoster';
import Genres from '@/components/common/Genres';
import { COLOR } from '@/constants/color';

import { getGenreTop10Data } from './api';

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
    <Container>
      <Genres onChange={onChange} shouldNeedAll />
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        breakpoints={{
          768: {
            slidesPerView: 6,
          },
        }}
      >
        {genreTop10Post?.map(({ postId, music: { albumCoverUrl, title, singer } }) => (
          <SwiperSlide key={postId} onClick={() => navigatePostDetail(postId)}>
            <AlbumPoster lazy={true} size={12.5} src={albumCoverUrl} />
            <TitleSinger>
              <div>{title}</div>
              <div>{singer}</div>
            </TitleSinger>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}

export default GenreTop10Post;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  & .swiper-wrapper {
    display: -webkit-inline-box;
    margin-top: 1rem;
  }
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
