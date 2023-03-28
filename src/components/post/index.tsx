import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { PostInfo } from '@/components/post/types';
import RecommendationPost from '@/components/RecommendationPost';

import NoContent from '../common/NoContent';
import MusicListSkeleton from '../common/skeleton/MusicListSkeleton';
import { getPostFeedData } from './api';

interface Props {
  genre: string;
}

function PostList({ genre }: Props) {
  const { data: postFeed, isLoading } = useQuery(['postfeed', genre], () => getPostFeedData(genre));

  if (isLoading) {
    return (
      <>
        <MusicListSkeleton />
        <MusicListSkeleton />
        <MusicListSkeleton />
      </>
    );
  }

  return postFeed?.length ? (
    <>
      {postFeed?.map(({ postId, nickname, music, likeCount, isBattlePossible }: PostInfo) => (
        <RecommendationPost
          key={postId}
          postId={postId}
          nickname={nickname}
          music={music}
          likeCount={likeCount}
          isBattlePossible={isBattlePossible}
        />
      ))}
    </>
  ) : (
    <Wrapper>
      <NoContent text='추천 글이 없습니다' isImage width={8} />
    </Wrapper>
  );
}

export default PostList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
