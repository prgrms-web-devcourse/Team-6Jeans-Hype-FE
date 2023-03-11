import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import ArrowRight from 'public/images/arrow-right.svg';
import Logo from 'public/images/letter-logo.svg';

import BottomNav from '@/components/common/BottomNav';
import GenreTop10Post from '@/components/main/GenreTop10Post';
import RandomBattle from '@/components/main/RandomBattle';
import { getRandomBattleAlbumCoverImage } from '@/components/main/RandomBattle/api';
import Ranking from '@/components/ranking';
import { COLOR } from '@/constants/color';

export default function Home() {
  const { data: randomBattle } = useQuery(['main_getRandomBattleAlbumCoverImage'], getRandomBattleAlbumCoverImage);

  const onClickRandomBattle = (battleId: number) => {
    // TODO: 대결 디테일로 이동 (참여한 대결 페이지 만들고 나서 할 것)
  };

  return (
    <Container>
      <StyledLogo />
      <Label>진행 중인 대결</Label>
      {randomBattle && (
        <StyledRandomBattle battle={randomBattle} onClick={() => onClickRandomBattle(randomBattle.battleId)} />
      )}
      <Label>이런 곡은 어때요?</Label>
      <GenreTop10Post />
      <RankingLabels>
        <Label>오늘의 TOP 5</Label>
        <Link href='/ranking'>
          <SeeMore>
            더보기 <StyledArrowRight />
          </SeeMore>
        </Link>
      </RankingLabels>
      <Ranking isLimit />
      <BottomNav />
    </Container>
  );
}

const Container = styled.div`
  width: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const StyledLogo = styled(Logo)`
  width: 5.5rem;
  height: 1.2rem;
  margin-top: 2.5rem;
  margin-bottom: 1.8rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Label = styled.span`
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2.3rem;
  margin-bottom: 1.7rem;
`;

const RankingLabels = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SeeMore = styled.span`
  font-size: 1rem;
`;

const StyledArrowRight = styled(ArrowRight)`
  & > path {
    stroke: ${COLOR.deepBlue};
  }
`;

const StyledRandomBattle = styled(RandomBattle)`
  margin-bottom: 2.9rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.01);
    transition: all 0.1s ease;
  }
`;
