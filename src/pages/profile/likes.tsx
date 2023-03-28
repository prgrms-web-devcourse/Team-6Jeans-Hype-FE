import styled from '@emotion/styled';
import { useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import NoContent from '@/components/common/NoContent';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { useGetMyLikeList } from '@/components/profile/likes/useGetMyLikeList';
import RecommendationPost from '@/components/RecommendationPost';

export default function MyLikePostListPage() {
  const [genre, setGenre] = useState<string | undefined>();

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;

    if (selectedGenre === 'ALL') {
      setGenre(undefined);
      return;
    }
    setGenre(selectedGenre);
  };

  const { data: myLikePostList } = useGetMyLikeList(genre);

  return (
    <AuthRequiredPage>
      <Container>
        <Header title='내 좋아요 목록' />
        <Content>
          <Genres shouldNeedAll onChange={onClickGenre} />
          <ListWrapper>
            {myLikePostList?.length ? (
              myLikePostList.map(({ postId, music, likeCount, isBattlePossible }) => (
                <RecommendationPost
                  key={postId}
                  postId={postId}
                  music={music}
                  likeCount={likeCount}
                  isBattlePossible={isBattlePossible}
                />
              ))
            ) : (
              <Wrapper>
                <NoContent text='좋아요 누른 글이 없습니다.' isImage width={8} />
              </Wrapper>
            )}
          </ListWrapper>
        </Content>
        <BottomNav />
      </Container>
    </AuthRequiredPage>
  );
}

const Container = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  gap: 0.5rem;
`;

const Content = styled.div`
  padding: 0 2rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  padding-bottom: 8.5rem;
`;
