import styled from '@emotion/styled';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';

import { GenreTop10PostInfo } from './type';

interface Props {
  genreTop10Post: GenreTop10PostInfo[];
  navigatePostDetail: (postId: number) => void;
}

function MobilePosts({ genreTop10Post, navigatePostDetail }: Props) {
  return (
    <Posts>
      {genreTop10Post?.map(({ postId, music: { albumCoverUrl, title, singer } }) => (
        <Post key={postId} onClick={() => navigatePostDetail(postId)}>
          <AlbumPoster lazy={true} size={12.5} src={albumCoverUrl} />
          <TitleSinger>
            <div>{title}</div>
            <div>{singer}</div>
          </TitleSinger>
        </Post>
      ))}
    </Posts>
  );
}

export default MobilePosts;

const Posts = styled.div`
  display: flex;
  margin-top: -0.5rem;

  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
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
