import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import NoContent from '@/components/common/NoContent';
import RecommendationPost from '@/components/common/RecommendationPost';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { useGetMyPostList } from '@/components/mypage/post/useGetMyPostList';

export default function MyPostListPage() {
  const [genre, setGenre] = useState<string | undefined>();

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === 'ALL') {
      setGenre(undefined);
      return;
    }
    setGenre(selectedGenre);
  };

  const { data: myPostList, refetch: refetchMyPostList } = useGetMyPostList(genre);

  useEffect(() => {
    refetchMyPostList();
  }, [genre, refetchMyPostList]);

  return (
    <AuthRequiredPage>
      <Header title='내 추천 목록' />
      <Container>
        <Genres shouldNeedAll onChange={onClickGenre} />
        {myPostList ? (
          <ListWrapper>
            {myPostList.map(({ postId, music, likeCount, isBattlePossible }) => (
              <RecommendationPost
                key={postId}
                postId={postId}
                music={music}
                likeCount={likeCount}
                isBattlePossible={isBattlePossible}
              />
            ))}
          </ListWrapper>
        ) : (
          <Wrapper>
            <NoContent text='내 추천 목록이 없습니다.' width={8} isImage={true} />
          </Wrapper>
        )}
      </Container>
      <BottomNav />
    </AuthRequiredPage>
  );
}

const Container = styled.div`
  padding: 0 2rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
