import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Header from '@/components/common/Header';
import Battle from '@/components/common/ImageButtons/BattleButton';
import Like from '@/components/common/ImageButtons/LikeButton';
import MusicPlayButton from '@/components/common/MusicPlayButton';
import { COLOR } from '@/constants/color';

import { getPostDetailData } from './api';
import MusicInfo from './musicInfo';

let play: any;

function PostDetail() {
  const [isRenderPostContent, setIsRenderPostContent] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const navigateUserProfile = () => {
    router.push(`/profile?memberId=${postDetail?.memberId}`);
  };

  const toggleContentViewStatus = () => setIsRenderPostContent((prev) => !prev);

  const onChangeCurrentTime = (time: number, isPlay: boolean) => {
    setCurrentTime(time);

    if (isPlay) {
      startPlayTIme();
    } else {
      stopPlayTime();
    }
  };

  const startPlayTIme = () => {
    if (!play) {
      play = setInterval(() => {
        setCurrentTime((prev) => (duration >= prev ? prev + 0.01 : prev));
      }, 10);
    }
  };

  const stopPlayTime = () => {
    clearInterval(play);
    play = null;
  };

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  useEffect(() => {
    const audio = document.querySelector('.audio') as HTMLAudioElement;

    audio.onloadedmetadata = () => {
      const { currentTime, duration } = audio;

      setCurrentTime(Math.ceil(currentTime));
      setDuration(Math.ceil(duration));
    };
  }, [postDetail]);

  useEffect(() => {
    const left = document.querySelector('#left') as HTMLElement;
    const right = document.querySelector('#right') as HTMLElement;

    if (left && right) {
      left.style.width = `${(currentTime / duration) * 100}%`;
      right.style.width = `${100 - (currentTime / duration) * 100}%`;
    }

    if (duration > 0 && Math.floor(duration) === Math.floor(currentTime)) {
      setCurrentTime(0);
      left.style.width = `0%`;
      right.style.width = `100%`;
    }
  }, [currentTime, duration]);

  return (
    <Container>
      <audio src={postDetail?.music.musicUrl} className='audio' preload='metadata' style={{ display: 'none' }} />
      <Header color={COLOR.white} backUrl='/post' />
      <Wrapper>
        {postDetail && (
          <MusicInfo
            title={postDetail.music.title}
            albumCoverUrl={postDetail.music.albumCoverUrl}
            singer={postDetail.music.singer}
          />
        )}

        <PlayStatus>
          <PlayBar>
            <div id='left'></div>
            <div></div>
            <div id='right'></div>
          </PlayBar>
          <PlayTime>
            <div>{calculateTime(currentTime)}</div>
            <div>{calculateTime(duration)}</div>
          </PlayTime>
        </PlayStatus>

        <PostDetailEvent>
          <Icon>
            <Like
              size={2.2}
              initCount={15}
              color='white'
              isClicked={true}
              onClick={() => {
                console.log('좋아요');
              }}
            />
          </Icon>

          <Icon>
            <MusicPlayButton src={postDetail?.music.musicUrl} onChangeCurrentTime={onChangeCurrentTime} />
          </Icon>

          <Icon>
            {postDetail?.isBattlePossible ? (
              <Battle size={1.5} color='white' battleAbility={true} onClick={navigatePostBattle} />
            ) : (
              <Battle size={1.5} color='white' battleAbility={false} />
            )}
          </Icon>
        </PostDetailEvent>

        <PostDetailContent>
          <ContentHeader isContent={!!postDetail?.content} isContentViewStatus={isRenderPostContent}>
            <ContentHeaderWrapper>
              <Title>
                <Name onClick={navigateUserProfile}>{postDetail?.nickname}</Name>님의{' '}
                {postDetail?.content === '' ? '추천' : '한마디'}
              </Title>
              <ToggleArrowButton isContent={!!postDetail?.content} onClick={toggleContentViewStatus}>
                <ToggleImage src='/images/down-arrow.svg' alt='img' isRenderPostContent={isRenderPostContent} />
              </ToggleArrowButton>
            </ContentHeaderWrapper>
          </ContentHeader>

          <ContentBody isContent={!!postDetail?.content} isContentViewStatus={isRenderPostContent}>
            <Content>{postDetail?.content}</Content>
          </ContentBody>
        </PostDetailContent>
      </Wrapper>
    </Container>
  );
}

export default PostDetail;

interface StyleProp {
  isContent?: boolean;
  isContentViewStatus?: boolean;
  isRenderPostContent?: boolean;
}

const Container = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: linear-gradient(130.7deg, #a274dc -10.45%, #658df4 122.15%);
  position: relative;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const PlayStatus = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  margin: 0 auto 2rem;
`;

const PlayBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  background-color: ${COLOR.white};
  border-radius: 0.45rem;

  & div:first-of-type {
    width: 0%;
    height: 0.75rem;
    background-color: ${COLOR.deepBlue};
    border-radius: 0.45rem;
  }

  & div:last-of-type {
    width: 0%;
    height: 0.75rem;
    background-color: ${COLOR.white};
    border-radius: 0.45rem;
  }
`;

const PlayTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostDetailEvent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 65%;
  margin: 0 auto;
`;

const Icon = styled.div`
  &:first-of-type {
    position: absolute;
    left: 0;
  }
  &:last-of-type {
    position: absolute;
    right: 0;
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
  bottom: ${({ isContent, isContentViewStatus }: StyleProp) => (isContent && isContentViewStatus ? '12.5%' : '0')};
  transition: bottom 0.3s ease-out;
  width: 100%;
  max-height: 4rem;
`;

const ContentHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.3rem;
  max-width: 70%;
  text-align: center;
`;

const Name = styled.strong`
  font-weight: 600;
`;

const ToggleArrowButton = styled.div`
  position: absolute;
  right: 3rem;
  display: ${({ isContent }: StyleProp) => (isContent ? 'block' : 'none')};
`;

const ToggleImage = styled.img`
  transform: rotate(${({ isRenderPostContent }: StyleProp) => (isRenderPostContent ? '0turn' : '-0.5turn')});
  transition: transform 0.3s ease;
`;

const ContentBody = styled.div`
  background: ${COLOR.background};

  position: absolute;
  left: 0;
  bottom: ${({ isContent, isContentViewStatus }: StyleProp) => (isContent && isContentViewStatus ? '0' : '-12.5%')};
  width: 100%;
  height: 13.5%;
  display: flex;
  transition: bottom 0.3s ease-out;
  justify-content: center;
`;

const Content = styled.p`
  border: 0.4px solid rgba(125, 116, 220, 0.4);
  border-radius: 1rem;
  padding: 1.3rem 1.7rem;
  margin: 0.5rem 2rem 2rem;
  width: 100%;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 1.9rem;
`;
