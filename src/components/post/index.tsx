import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import RecommendationPost from '@/components/common/RecommendationPost';
import { PostInfo } from '@/components/post/types';
import { COLOR } from '@/constants/color';

import { getPostFeedData } from './api';

function PostList() {
  const [genre, setGenre] = useState('');
  const [isPossibleBattle, setIsPossibleBattle] = useState<boolean | undefined>(undefined);

  const { data: postFeed } = useQuery(['postfeed', genre, isPossibleBattle], () => {
    return getPostFeedData({ genre, isPossibleBattle });
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    setGenre(selectedGenre);
  };

  return (
    <Container>
      <Header>
        <Title>한눈에 보는 추천</Title>
        <Filter>
          최신순
          <img src='./images/down-arrow-gray.svg' alt='필터링' />
        </Filter>
      </Header>
      <Genres onChange={onChange} />
      {/* <Battles setIsPossibleBattle={setIsPossibleBattle} /> */}
      <PostFeedList>
        {postFeed?.map(({ postId, music, likeCount, isBattlePossible }: PostInfo) => (
          <RecommendationPost
            key={postId}
            postId={postId}
            music={music}
            likeCount={likeCount}
            isBattlePossible={isBattlePossible}
          />
        ))}
      </PostFeedList>
      <BottomNav />
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

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  font-size: 1rem;
  color: ${COLOR.gray};
`;

const PostFeedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding-bottom: 8rem;
`;
