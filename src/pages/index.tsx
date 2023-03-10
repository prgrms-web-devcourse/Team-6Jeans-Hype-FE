import styled from '@emotion/styled';
import Link from 'next/link';
import ArrowRight from 'public/images/arrow-right.svg';
import Logo from 'public/images/letter-logo.svg';

import BottomNav from '@/components/common/BottomNav';
import GenreTop10Post from '@/components/main/GenreTop10Post';
import RandomBattle from '@/components/main/RandomBattle';
import Ranking from '@/components/ranking';
import { COLOR } from '@/constants/color';

export default function Home() {
  const PROGRESS_BATTLE_DUMMY = {
    challengedAlbumCoverImage:
      'https://is2-ssl.mzstatic.com/image/thumb/Music115/v4/a9/6c/89/a96c893b-e5bd-2c55-897c-7604201c3335/cover-.jpg/100x100bb.jpg',
    challengingAlbumCoverImage:
      'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/70/07/f7/7007f789-3730-e11f-5450-984c22e9c0f8/cover_KM0016002_1.jpg/100x100bb.jpg',
  };
  return (
    <Container>
      <StyledLogo />
      <Label>진행 중인 대결</Label>
      <StyledRandomBattle {...PROGRESS_BATTLE_DUMMY} />
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
