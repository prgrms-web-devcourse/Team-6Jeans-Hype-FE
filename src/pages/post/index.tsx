import styled from '@emotion/styled';
import { useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import PostList from '@/components/post';

function Post() {
  const [genre, setGenre] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    selectedGenre === 'ALL' ? setGenre('') : setGenre(selectedGenre);
  };

  return (
    <Container>
      <Header>
        <Title>한눈에 보는 추천</Title>
      </Header>
      <Genres shouldNeedAll onChange={onChange} />
      <PostListContainer>
        <PostList genre={genre} />
      </PostListContainer>
      <BottomNav />
    </Container>
  );
}

export default Post;

const Container = styled.div`
  width: calc(100% - 4rem);
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

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding-bottom: 8rem;
`;
