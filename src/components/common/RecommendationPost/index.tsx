import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import AlbumPoster from '@/components/common/AlbumPoster';
import Battle from '@/components/common/ImageButtons/BattleButton';
import Like from '@/components/common/ImageButtons/LikeButton';
import { PostInfo } from '@/components/post/types';
import { COLOR } from '@/constants/color';

function RecommendationPost({ postId, music: { albumCoverUrl, singer, title }, likeCount }: PostInfo) {
  const router = useRouter();

  const navigatePostDetail = (postId: number) => router.push(`/post/detail?postId=${postId}`);

  return (
    <Container key={postId}>
      <Wrapper>
        <AlbumPoster lazy={true} size={6} src={albumCoverUrl} onClick={() => navigatePostDetail(postId)} />
        <MusicInfo onClick={() => navigatePostDetail(postId)}>
          <Title>{title}</Title>
          <Artist>{singer}</Artist>
        </MusicInfo>
        <ButtonWrapper>
          <Battle
            size={1.2}
            battleAbility={false}
            onClick={() => {
              console.log('배틀 신청');
            }}
          />
          <Like
            size={1.5}
            color='purple'
            initCount={likeCount}
            isClicked={false}
            onClick={() => console.log('todo 좋아요 관련 api 연결하기')}
          />
        </ButtonWrapper>
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
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 0.3rem;
  align-items: center;
  background: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  position: relative;
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
`;

const Artist = styled.h2`
  font-weight: 400;
  font-size: 1rem;
  color: ${COLOR.gray};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;
