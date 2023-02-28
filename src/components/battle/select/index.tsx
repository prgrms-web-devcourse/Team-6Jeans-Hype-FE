import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRef } from 'react';

import AlbumPoster from '@/components/common/AlbumPoster';
import Genres from '@/components/common/Genres';
import useVoteResult from '@/hooks/useVoteResult';

import VoteResult from '../voteResult';

function sleep(ms: number) {
  //sleep 함수
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TEMP =
  'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg';

function Select() {
  const { visible, onClick } = useVoteResult();
  const tmpRef = useRef();

  const onClickTemp = async () => {
    tmpRef.current.style.zIndex = `999`;
    for (let i = 30; i <= 50; i++) {
      tmpRef.current.style.left = `${i}%`;
      await sleep(1);
    }
    onClick();
    tmpRef.current.style.left = `30%`;
    tmpRef.current.style.zIndex = `1`;
  };
  return (
    <>
      <SelectContainer>
        <Genres onChange={() => console.log('click-genre')} />
        <TempContainer onClick={onClickTemp} ref={tmpRef}>
          <AlbumPoster lazy={true} src={TEMP} size={10} />
        </TempContainer>
      </SelectContainer>
      {visible && <VoteResult battleId={1234} votedPostId={1234} clickSide='right' />}
    </>
  );
}

export default Select;

const SelectContainer = styled.div``;

const TempContainer = styled.span`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 39%;
  left: 30%;
`;
