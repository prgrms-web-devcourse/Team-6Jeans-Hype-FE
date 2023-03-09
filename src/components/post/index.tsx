import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import Genres from '@/components/common/Genres';
import RecommendationPost from '@/components/common/RecommendationPost';
import { PostInfo } from '@/components/post/types';

import { getPostFeedData } from './api';
import MusicListSkeleton from '../common/skeleton/MusicListSkeleton';

function PostList() {
  const [genre, setGenre] = useState('');

  const { data: postFeed, isLoading } = useQuery(['postfeed', genre], () => {
    return getPostFeedData(genre);
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };

  return (
    <Container>
      <Header>
        <Title>한눈에 보는 추천</Title>
      </Header>
      <Genres onChange={onChange} />
      <PostFeedList>
        {isLoading ? (
          <>
            <MusicListSkeleton />
            <MusicListSkeleton />
            <MusicListSkeleton />
          </>
        ) : (
          postFeed?.map(({ postId, music, likeCount, isBattlePossible }: PostInfo) => (
            <RecommendationPost
              key={postId}
              postId={postId}
              music={music}
              likeCount={likeCount}
              isBattlePossible={isBattlePossible}
            />
          ))
        )}
      </PostFeedList>
    </Container>
  );
}

export default PostList;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0.5rem 2rem;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8rem;
`;

const PostFeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding-bottom: 8rem;
`;
