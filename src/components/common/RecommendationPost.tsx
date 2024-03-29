import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import AlbumPoster from '@/components/common/AlbumPoster';
import Battle from '@/components/common/button/BattleButton';
import Like from '@/components/common/button/LikeButton';
import { PostInfo } from '@/components/post/types';
import { COLOR } from '@/constants/color';

function RecommendationPost({
  postId,
  nickname,
  music: { albumCoverUrl, singer, title },
  likeCount,
  isBattlePossible,
}: PostInfo) {
  const router = useRouter();

  const navigatePostDetail = (e: React.MouseEvent<HTMLDivElement>, postId: number) => {
    if (e.defaultPrevented) return;

    router.push(`/post/detail?postId=${postId}`);
  };
  const navigatePostBattle = (postId: number) => router.push(`/post/battle?postId=${postId}`);

  return (
    <Container>
      {nickname && <Nickname>{nickname}</Nickname>}
      <Wrapper key={postId} onClick={(e) => navigatePostDetail(e, postId)}>
        <AlbumPoster lazy={true} size={6.6} src={albumCoverUrl} />
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

            <Like size={1.5} color='purple' initCount={likeCount} initIsClick />
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

const Nickname = styled.span`
  color: ${COLOR.gray};
  margin-bottom: 0.8rem;
  padding-left: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: ${COLOR.white};
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 7rem);
  position: relative;
`;

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  padding-left: 1.3rem;
  width: calc(100% - 9.5rem);
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.7rem;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Artist = styled.h2`
  font-weight: 500;
  font-size: 1rem;
  color: ${COLOR.gray};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  right: 1.1rem;
`;
