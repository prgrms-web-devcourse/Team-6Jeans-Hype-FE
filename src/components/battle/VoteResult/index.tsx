import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import LinearGradientLogo from 'public/images/linear-gradient-logo.svg';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';

import { useGetVoteResult } from './useGetVoteResult';

interface Props {
  battleId: number;
  votedPostId: number;
  clickSide: 'left' | 'right' | undefined;
}

function VoteResult({ battleId, votedPostId, clickSide }: Props) {
  const router = useRouter();
  const isDetail = router.pathname === '/battle/detail';

  const { data: voteResult } = useGetVoteResult({ battleId, votedPostId });

  const selected = <span className='selected'>{voteResult?.selectedPostVoteCnt}</span>;
  const opposite = <span className='opposite'>{voteResult?.oppositePostVoteCnt}</span>;

  return (
    <VoteResultModal className={isDetail ? 'infinity' : undefined}>
      <Wrapper>
        <VoteResultContainer>
          <AlbumPoster lazy={true} src={voteResult?.albumCoverUrl} size={10} />
          <Title>{voteResult?.title}</Title>
          <StaticText>를 선택하셨습니다.</StaticText>
          <Votes>
            {clickSide === 'left' ? selected : opposite}
            <StyledIcon />
            {clickSide === 'right' ? selected : opposite}
          </Votes>
          {isDetail && <Back onClick={() => router.push('/battle/list')}>돌아가기</Back>}
        </VoteResultContainer>
      </Wrapper>
    </VoteResultModal>
  );
}

export default VoteResult;

const backgroundFade = keyframes`
  0% {
    background-position:0% 50%;
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50%{
    background-position:100% 50%;
  }
  80%{
    opacity: 1;
  }
  100% {
    opacity: 0.96;
    background-position:0% 50%
  }
`;

const backgroundFadeInfinity = keyframes`
  0%{
    opacity: 0.96;
    background-position:0% 50%
  }
  50%{
    background-position:100% 50%
  }
  100%{
    opacity: 0.96;
    background-position:0% 50%
  }
`;

const VoteResultModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 76rem;
  background: linear-gradient(130.7deg, rgba(162, 116, 220, 1) -10.45%, rgba(101, 141, 244, 1) 122.15%);
  background-size: 800% 800%;
  animation: ${backgroundFade} 2s ease;
  z-index: 99;

  &.infinity {
    animation-name: ${backgroundFade}, ${backgroundFadeInfinity};
    animation-delay: 0s, 2s;
    animation-duration: 2s, 2s;
    animation-iteration-count: 1, infinite;
  }
`;

const Wrapper = styled.div`
  position: relative;
  top: 13.6rem;
  width: calc(100% - 4rem);
  height: calc(100vh - 22rem);
  padding: 0 2rem;
  min-height: 45rem;
  margin-bottom: 10rem;
`;

const VoteResultContainer = styled.div`
  position: relative;
  height: 39.1rem;
  top: calc(50% + 11.5em);
  transform: translateY(-50%);
  min-height: 45rem;
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99;
  animation: name duration timing-function delay iteration-count direction fill-mode;
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

const StyledIcon = styled(LinearGradientLogo)`
  width: 3.2rem;
`;

const Back = styled.div`
  color: ${COLOR.background};
  margin-top: 10rem;
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.9rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
`;
