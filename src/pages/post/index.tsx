import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import NoContent from '@/components/common/NoContent';
import RecommendationPost from '@/components/common/RecommendationPost';
import MusicListSkeleton from '@/components/common/skeleton/MusicListSkeleton';
import { getPostFeedData } from '@/components/post/api';
import { PostInfo } from '@/components/post/types';

function Post() {
  const [genre, setGenre] = useState('');
  const { data: postFeed, isLoading } = useQuery<PostInfo[]>(['postfeed', genre], () => getPostFeedData(genre));

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };

  return (
    <Container>
      <Header>
        <Title>한 눈에 보는 추천</Title>
      </Header>
      <Genres shouldNeedAll onChange={onChange} />
      <PostListContainer>
        {postFeed?.length ? (
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
        ) : isLoading ? (
          <>
            <MusicListSkeleton />
            <MusicListSkeleton />
            <MusicListSkeleton />
          </>
        ) : (
          <Wrapper>
            <NoContent text='추천 글이 없습니다' isImage width={8} />
          </Wrapper>
        )}
      </PostListContainer>
      <BottomNav />
    </Container>
  );
}

export default Post;

const Container = styled.div`
  width: calc(100% - 4rem);
  height: 100vh;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0;
  margin-bottom: 0.6rem;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.8rem;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 8rem;
  height: calc(100vh - 23.5rem);
  overflow-y: auto;
`;

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
