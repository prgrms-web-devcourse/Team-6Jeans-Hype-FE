import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

import AlbumPoster from '@/components/common/AlbumPoster';
import NoContent from '@/components/common/NoContent';
import { COLOR } from '@/constants/color';

import { GenreTop10PostInfo } from './type';

interface Props {
  genreTop10Post?: GenreTop10PostInfo[];
  navigatePostDetail: (postId: number) => void;
}

function DeskTopPosts({ genreTop10Post, navigatePostDetail }: Props) {
  return (
    <Container>
      {genreTop10Post && genreTop10Post.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView={6}>
          {genreTop10Post?.map(({ postId, music: { albumCoverUrl, title, singer } }) => (
            <SwiperSlide key={postId} onClick={() => navigatePostDetail(postId)}>
              <AlbumPoster lazy={true} size={10} src={albumCoverUrl} />
              <TitleSinger>
                <div>{title}</div>
                <div>{singer}</div>
              </TitleSinger>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Wrapper>
          <NoContent text='추천 글이 없습니다' isImage width={8} />
        </Wrapper>
      )}
    </Container>
  );
}

export default DeskTopPosts;

const Container = styled.div`
  overflow: hidden;
  cursor: pointer;

  & .swiper-wrapper {
    display: -webkit-inline-box;
  }
`;

const TitleSinger = styled.div`
  margin-top: 1rem;
  width: 100%;
  word-break: break-all;

  & div:first-of-type {
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.4rem;
    color: ${COLOR.deepBlue};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  & div:last-of-type {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.4rem;
    color: ${COLOR.gray};
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  margin-top: 4.5rem;
`;
