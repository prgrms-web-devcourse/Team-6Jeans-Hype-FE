import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';
import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GenreTop10PostInfo } from './type';

interface Props {
  genreTop10Post: GenreTop10PostInfo[];
  navigatePostDetail: (postId: number) => void;
}

function DeskTopPosts({ genreTop10Post, navigatePostDetail }: Props) {
  return (
    <Container>
      <Swiper spaceBetween={50} slidesPerView={6}>
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

export default DeskTopPosts;

const Container = styled.div`
  overflow: hidden;

  & .swiper-wrapper {
    display: -webkit-inline-box;
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
