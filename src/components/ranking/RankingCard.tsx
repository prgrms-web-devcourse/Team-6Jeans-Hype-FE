import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

import { Ranking } from './types';

interface Props {
  user: Ranking;
  isMyRanking: boolean;
}

function RankingCard({ user, isMyRanking }: Props) {
  const { memberNickname, memberPoint, memberRanking } = user;

  return (
    <RankingCardContainer className={isMyRanking ? 'my' : undefined}>
      <Rank className={isMyRanking ? 'my' : undefined}>{memberRanking}</Rank>
      <Nickname>{memberNickname}</Nickname>
      <Point>{memberPoint} Points</Point>
    </RankingCardContainer>
  );
}

export default RankingCard;

const RankingCardContainer = styled.div`
  background: ${COLOR.white};
  box-shadow: 0 0 1rem rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  display: flex;
  height: 2.2rem;
  padding: 1rem 0;
  align-items: center;
  position: relative;

  &.my {
    background: rgba(118, 151, 236, 0.1);
  }
`;

const Rank = styled.div`
  background: rgba(125, 116, 220, 0.29);
  width: 2.4rem;
  height: 2.4rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 50%;
  font-weight: 600;
  font-size: 1.4rem;
  margin: 0 1.3rem;

  &.my {
    background: rgba(118, 151, 236, 0.4);
  }
`;

const Nickname = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.6rem;
  letter-spacing: 0.05rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(100% - 15rem);
`;

const Point = styled.div`
  position: absolute;
  right: 1.3rem;
  margin-right: 1.3rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5rem;
`;
