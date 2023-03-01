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
      <Title>
        <div>한눈에 보는 추천</div>
        <Filter>
          <div>최신순</div>
          <img src='./images/down-arrow-gray.svg' alt='필터 버튼' />
        </Filter>
      </Title>
      <Genres onChange={onChange} />
      {/* <Battles setIsPossibleBattle={setIsPossibleBattle} /> */}

      <FeedPostList>
        {postFeed?.map(
          ({
            postId,
            music: { albumCoverUrl, singer, musicName, genre },
            likeCount,
            isBattlePossible,
            nickname,
          }: PostInfo) => (
            <RecommendationPost
              key={postId}
              postId={postId}
              music={{ albumCoverUrl, singer, musicName, genre }}
              likeCount={likeCount}
              isBattlePossible={isBattlePossible}
              nickname={nickname}
            />
          ),
        )}
      </FeedPostList>
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  & > div:first-of-type {
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.6rem;
    text-align: center;
    color: ${COLOR.deepBlue};
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 1rem;
  line-height: 1.4rem;
  text-align: center;

  color: ${COLOR.gray};

  & div {
    margin-right: 0.5rem;
  }
`;

const FeedPostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-top: 5rem;
  padding-bottom: 8rem;
`;
