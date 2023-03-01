import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { BattleMusicInfo } from '@/components/post/battle/types';
import { COLOR } from '@/constants/color';

interface Prop {
  music: BattleMusicInfo;
  onClick?(e: any): void;
  clickSide?: 'left' | 'right' | undefined;
}

const BattleMusicInfo = ({ music, onClick, clickSide }: Prop) => {
  const { thumbnailUrl, musicUrl, musicName, singer } = music;

  const handleClick = (e: any) => {
    onClick?.(e);
  };

  return (
    <Container>
      <Wrapper onClick={handleClick} className='container'>
        <Thumbnail src={thumbnailUrl} clickSide={clickSide}>
          <PlayIcon value={musicUrl}>
            <audio src={musicUrl} controls loop></audio>
          </PlayIcon>
          <PlusIcon src='/images/plus-music.svg' value={musicUrl} />
        </Thumbnail>
        <Title>{musicName}</Title>
        <Singer>{singer}</Singer>
      </Wrapper>
    </Container>
  );
};

export default BattleMusicInfo;

const moveLeft = keyframes`
  0% {
    right:0%;
  }
  15% {
    right:55%;
  }
  100% {
    right:55%;
  }
`;

const moveRight = keyframes`
  0% {
    left:0%;
  }
  15% {
    left:55%;
  }
  100% {
    left:55%;
  }
`;

const Container = styled.div`
  max-width: 20rem;
  width: 45%;
  height: 18rem;

  background: ${COLOR.white};

  box-shadow: 0px 0px 1.5rem rgba(158, 158, 158, 0.25);
  border-radius: 1rem;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  top: -3rem;
`;

const Thumbnail = styled.div<{ src: string; clickSide: 'left' | 'right' | undefined }>`
  background-image: url(${(props) => props.src});
  background-color: ${(props) => props.src === '' && COLOR.lightGray};
  background-repeat: no-repeat;
  filter: drop-shadow(0 0 1.5rem rgba(158, 158, 158, 0.25));
  border-radius: 1rem;
  width: 10rem;
  height: 10rem;
  position: relative;
  margin-bottom: 2rem;

  &.active {
    animation: ${(props) => (props.clickSide === 'right' ? moveLeft : moveRight)} 2s ease-in;
  }
`;

const PlayIcon = styled.div<{ value: string | undefined }>`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #cccccc;
  box-sizing: content-box;

  & audio {
    margin-top: -0.75rem;
    margin-left: -0.6rem;
    display: ${(prop) => (prop.value === '' ? 'none' : 'block')};
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PlusIcon = styled.img<{ value: string | undefined }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(prop) => (prop.value === '' ? 'block' : 'none')};
`;

const Title = styled.div`
  width: calc(100% - 1.6rem);
  padding: 0 0.8rem;
  font-style: normal;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.9rem;
  text-align: center;
  color: ${COLOR.deepBlue};
  margin-bottom: 1rem;
`;

const Singer = styled.div`
  width: calc(100% - 1.6rem);
  padding: 0 0.8rem;
  font-style: normal;
  font-weight: 500;
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-align: center;
  color: ${COLOR.gray};
`;