import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import AlbumPoster from '@/components/common/AlbumPoster';
import Battle from '@/components/common/ImageButtons/BattleButton';
import Like from '@/components/common/ImageButtons/LikeButton';
import { PostInfo } from '@/components/post/types';
import { COLOR } from '@/constants/color';

function RecommendationPost({
  postId,
  music: { albumCoverUrl, singer, title },
  likeCount,
  isBattlePossible,
}: PostInfo) {
  const router = useRouter();

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);
  const navigatePostBattle = (postId: number) => router.push(`/post/battle?postId=${postId}`);

  return (
    <Container key={postId} onClick={() => navigatePostDetail(postId)}>
      <Wrapper>
        <AlbumPoster lazy={true} size={6} src={albumCoverUrl} />
        <Content>
          <MusicInfo>
            <Title>{title}</Title>
            <Artist>{singer}</Artist>
          </MusicInfo>
          <ButtonWrapper>
            {isBattlePossible && (
              <Battle
                size={1.2}
                color='blue'
                battleAbility={true}
                onClick={() => {
                  navigatePostBattle(postId);
                }}
              />
            )}

            <Like
              size={1.5}
              color='purple'
              initCount={likeCount}
              isClicked={false}
              onClick={() => console.log('todo 좋아요 관련 api 연결하기')}
            />
          </ButtonWrapper>
        </Content>
      </Wrapper>
    </Container>
  );
}

export default RecommendationPost;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  width: calc(100% - 7rem);
  gap: 2rem;
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.7rem;
  word-break: break-all;
`;

const Artist = styled.h2`
  font-weight: 400;
  font-size: 1rem;
  color: ${COLOR.gray};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
