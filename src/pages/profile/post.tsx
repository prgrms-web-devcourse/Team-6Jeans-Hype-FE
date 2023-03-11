import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import NoContent from '@/components/common/NoContent';
import RecommendationPost from '@/components/common/RecommendationPost';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { useGetMyPostList } from '@/components/profile/post/useGetMyPostList';

export default function MyPostListPage() {
  const [genre, setGenre] = useState<string | undefined>();
  const router = useRouter();
  const { memberId } = router.query;

  const onClickGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenre = e.target.value;
    if (selectedGenre === 'ALL') {
      setGenre(undefined);
      return;
    }
    setGenre(selectedGenre);
  };

  const { data: myPostList } = useGetMyPostList(genre, Number(memberId));

  return (
    <AuthRequiredPage>
      <Header title={memberId ? '추천 목록' : '내 추천 목록'} />
      <Container>
        <Genres shouldNeedAll onChange={onClickGenre} />
        <ListWrapper>
          {myPostList?.length ? (
            myPostList.map(({ postId, music, likeCount, isBattlePossible }) => (
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
              <NoContent text='추천한 음악이 없습니다.' isImage width={8} />
            </Wrapper>
          )}
        </ListWrapper>
      </Container>
      <BottomNav />
    </AuthRequiredPage>
  );
}

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

const Container = styled.div`
  padding: 0 2rem;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
