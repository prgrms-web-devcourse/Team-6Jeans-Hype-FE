import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import Header from '@/components/common/Header';
import Battle from '@/components/common/ImageButtons/BattleButton';
import Like from '@/components/common/ImageButtons/LikeButton';
import { COLOR } from '@/constants/color';

import { getPostDetailData } from './api';
import MusicInfo from './musicInfo';

function PostDetail() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: postDetail } = useQuery(
    ['post', 'detail', postId],
    () => getPostDetailData(parseInt(postId as string)),
    {
      enabled: !!postId,
    },
  );

  const navigatePostBattle = () => {
    router.push(`/post/battle?postId=${postId}`);
  };

  return (
    <Container>
      <Wrapper>
        <Header selectedColor='white' />

        {postDetail && (
          <MusicInfo
            musicName={postDetail.music.musicName}
            musicUrl={postDetail.music.musicUrl}
            albumCoverUrl={postDetail.music.albumCoverUrl}
            singer={postDetail.music.singer}
            genre={postDetail.music.genre}
          />
        )}

        <PlayStatus>
          <PlayBar>
            <div></div>
            <div></div>
            <div></div>
          </PlayBar>
          <PlayTime>
            <div>1:46</div>
            <div>4:10</div>
          </PlayTime>
        </PlayStatus>

        <PostDetailEvent>
          <Icon>
            <Like
              size={2}
              initCount={15}
              isClicked={true}
              onClick={() => {
                console.log('좋아요');
              }}
            />
          </Icon>

          <Icon>
            <PostPlayIcon>
              <audio src={postDetail?.music.musicUrl} controls loop></audio>
            </PostPlayIcon>
          </Icon>

          <Icon>
            <Battle
              size={1.5}
              battleAbility={true}
              onClick={navigatePostBattle}
            />
          </Icon>
        </PostDetailEvent>

        {postDetail?.content && (
          <PostDetailContent>
            <ContentHeader>
              <Title>
                <div></div>
                <div>
                  <div>{postDetail?.nickname}</div>
                  <div>님의 한마디</div>
                </div>
                <div>
                  <img src='/images/down-arrow.png' alt='img' />
                </div>
              </Title>
            </ContentHeader>

            <ContentBody>
              <Content>{postDetail.content}</Content>
            </ContentBody>
          </PostDetailContent>
        )}
      </Wrapper>
    </Container>
  );
}

export default PostDetail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.purple};
  position: relative;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 2rem auto 0 auto;
`;

const PrevButton = styled.img`
  width: 1.5rem;
  height: 2rem;
`;

const PlayStatus = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin: 0 auto 2rem auto;
`;

const PlayBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: ${COLOR.white};
  border-top-left-radius: 0.45rem;
  border-bottom-left-radius: 0.45rem;
  border-top-right-radius: 0.45rem;
  border-bottom-right-radius: 0.45rem;

  & div:first-of-type {
    width: 50%;
    height: 0.75rem;
    background-color: ${COLOR.deepBlue};
    border-top-left-radius: 0.45rem;
    border-bottom-left-radius: 0.45rem;
    border-top-right-radius: 0.45rem;
    border-bottom-right-radius: 0.45rem;
  }
  & div:last-of-type {
    width: 50%;
    height: 0.75rem;
    background-color: ${COLOR.white};
    border-top-right-radius: 0.45rem;
    border-bottom-right-radius: 0.45rem;
  }
`;

const PlayTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostDetailEvent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 65%;
  margin: 0 auto;
`;

const Icon = styled.div`
  &:first-of-type,
  &:last-of-type {
    width: 18%;
  }
`;

const PostPlayIcon = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #cccccc;
  box-sizing: content-box;

  & audio {
    margin-top: -0.75rem;
    margin-left: -0.6rem;
    display: block;
  }
`;

const PostDetailContent = styled.div``;

const ContentHeader = styled.div`
  background: ${COLOR.background};
  box-shadow: 0.5rem 0 1.5rem rgba(135, 135, 135, 0.7);
  border-radius: 2rem 2rem 0 0;
  padding: 2rem 0;

  position: absolute;
  left: 0;
  bottom: 12.5%;
  width: 100%;
  height: 2.5%;
`;

const Title = styled.div`
  width: 90%;
  margin: 0 auto;

  display: flex;
  align-items: center;

  & div:nth-of-type(1) {
    width: 25%;
  }

  & div:nth-of-type(2) {
    width: 50%;

    font-style: normal;
    font-size: 1.5rem;
    line-height: 2.2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${COLOR.deepBlue};

    & div:nth-of-type(1) {
      font-weight: 700;
    }
    & div:nth-of-type(2) {
      font-weight: 500;
      margin-left: -0.5rem;
    }
  }

  & div:nth-of-type(3) {
    width: 25%;
    text-align: right;
    cursor: pointer;
  }
`;

const ContentBody = styled.div`
  background: ${COLOR.background};

  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 13.5%;
`;

const Content = styled.div`
  border: 0.4px solid rgba(125, 116, 220, 0.4);
  border-radius: 1rem;
  padding: 1rem;
  width: 90%;
  margin: 1.5rem auto 0 auto;

  font-style: normal;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.9rem;

  color: ${COLOR.deepBlue};
`;
