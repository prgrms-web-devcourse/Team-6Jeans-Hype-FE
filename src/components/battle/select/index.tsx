import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

import AlbumPoster from '@/components/common/AlbumPoster';
import Genres from '@/components/common/Genres';
import useVoteResult from '@/hooks/useVoteResult';

import VoteResult from '../voteResult';

const TEMP =
  'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg';

function Select() {
  const { visible, onClick } = useVoteResult();
  const refForMove = useRef<HTMLSpanElement>(null);

  const onClickTemp = async () => {
    const target = refForMove.current;

    if (target) {
      const { className } = target;

      target.className = `${className} active`;

      setTimeout(() => {
        onClick();
        target.className = `${className}`;
      }, 50);
    }
  };

  return (
    <>
      <SelectContainer>
        <Genres onChange={() => console.log('click-genre')} />
        <TempContainer onClick={onClickTemp} id='move' ref={refForMove}>
          <AlbumPoster lazy={true} src={TEMP} size={10} />
        </TempContainer>
      </SelectContainer>
      {visible && <VoteResult battleId={1234} votedPostId={1234} clickSide='right' />}
    </>
  );
}

export default Select;

const move = keyframes`
  0% {
    left:30%;
  }
  100% {
    left:50%;
  }
`;

const SelectContainer = styled.div``;

const TempContainer = styled.span`
  position: absolute;
  transform: translateX(-50%);
  top: 150px;
  left: 30%;
  &.active {
    animation: ${move} 0.2s ease;
  }
`;
