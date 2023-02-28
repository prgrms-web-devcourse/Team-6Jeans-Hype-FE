import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';

import { createBattleVote } from '../api';

interface Props {
  battleId: number;
  votedPostId: number;
  clickSide: 'left' | 'right';
}

function VoteResult({ battleId, votedPostId, clickSide }: Props) {
  const { data: voteResult, isLoading } = useQuery(
    ['voteResult', battleId],
    () => createBattleVote(battleId, votedPostId),
    {
      enabled: !!battleId && !!votedPostId,
    },
  );

  const selected = <span className='selected'>{voteResult?.selectedPostVoteCnt}</span>;
  const opposite = <span className='opposite'>{voteResult?.oppositePostVoteCnt}</span>;

  return (
    <VoteResultModal>
      {isLoading ? (
<<<<<<< HEAD
        <div>skeleton으로 교체 예정</div>
      ) : (
        <VoteResultContainer>
=======
        <div>로딩중입니다만</div>
      ) : (
        <>
>>>>>>> 45bee6d (feat: 숏폼 디자인 및 기능 임시)
          <AlbumPoster lazy={true} src={voteResult?.albumCoverUrl} size={10} />
          <Title>{voteResult?.title}</Title>
          <StaticText>를 선택하셨습니다.</StaticText>
          <Votes>
            {clickSide === 'left' ? selected : opposite}
            <img src={'/images/linear-gradient-logo.svg'} alt='img' />
            {clickSide === 'right' ? selected : opposite}
          </Votes>
<<<<<<< HEAD
        </VoteResultContainer>
=======
        </>
>>>>>>> 45bee6d (feat: 숏폼 디자인 및 기능 임시)
      )}
    </VoteResultModal>
  );
}

export default VoteResult;

const backgroundFade = keyframes`
  0% {
    background: ${COLOR.background};
<<<<<<< HEAD
    opacity: 0;
=======
    opacity: 0.96;
>>>>>>> 45bee6d (feat: 숏폼 디자인 및 기능 임시)
  }
  20% {
    background: ${COLOR.blue}
  }
  80% {
    background: ${COLOR.purple};
    opacity: 0.96;
  }
  100% {
    opacity: 0;
  }
`;

const VoteResultModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
<<<<<<< HEAD
  animation: ${backgroundFade} 2s ease;
  z-index: 99;
`;

const VoteResultContainer = styled.div`
  position: relative;
  top: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
=======
  animation: ${backgroundFade} 3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
>>>>>>> 45bee6d (feat: 숏폼 디자인 및 기능 임시)
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.3rem;
  color: ${COLOR.white};
  margin-top: 2.6rem;
`;

const StaticText = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2.2rem;
  color: ${COLOR.white};
  margin-top: 0.8rem;
`;

const Votes = styled.div`
  width: 20rem;
  height: 4rem;
  background: ${COLOR.background};
  box-shadow: 0 0 1rem rgba(226, 226, 226, 0.25);
  border-radius: 1.9rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 5rem;
  & > span {
    font-size: 1.6rem;
    font-weight: 500;
  }

  .selected {
    color: ${COLOR.blue};
  }

  .opposite {
    color: ${COLOR.lightGray};
  }
`;
