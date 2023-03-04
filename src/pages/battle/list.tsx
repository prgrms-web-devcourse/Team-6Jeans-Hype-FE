import styled from '@emotion/styled';
import Link from 'next/link';
import ShortsIcon from 'public/images/shuffle.svg';

import BattleCard from '@/components/battle/list/Card';
import { Battle } from '@/components/battle/list/types';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

export default function BattleListPage() {
  const BATTLE_LIST_DUMMY: Battle[] = [
    {
      left: {
        albumCoverImage:
          'https://lh3.googleusercontent.com/oWkokJPvuAfoePrq3Y1uxiCFBUGCHWYqO-2HNyt6H2wHowRiMwWkahp6ccKyqtyTm8y9q_CvDlA7Gqc=w544-h544-l90-rj',
        title: '건물 사이에 피어난 장미',
        singer: 'H1-KEY',
      },
      right: {
        albumCoverImage:
          'https://lh3.googleusercontent.com/wO1e34ZIcA1kJp5IXYqt2JGE2IxrajoiHM_04M9Pgk8RqSxVBsAw1EK4DOuzb_r6NG1d8f9LHN4pcTLo=w544-h544-l90-rj',
        title: 'Impurities',
        singer: 'LE SSERAFIM',
      },
    },
    {
      left: {
        albumCoverImage:
          'https://lh3.googleusercontent.com/oWkokJPvuAfoePrq3Y1uxiCFBUGCHWYqO-2HNyt6H2wHowRiMwWkahp6ccKyqtyTm8y9q_CvDlA7Gqc=w544-h544-l90-rj',
        title: '건물 사이에 피어난 장미',
        singer: 'H1-KEY',
      },
      right: {
        albumCoverImage:
          'https://lh3.googleusercontent.com/wO1e34ZIcA1kJp5IXYqt2JGE2IxrajoiHM_04M9Pgk8RqSxVBsAw1EK4DOuzb_r6NG1d8f9LHN4pcTLo=w544-h544-l90-rj',
        title: 'Impurities',
        singer: 'LE SSERAFIM',
      },
    },
  ];
  return (
    <>
      <Header
        title='진행 중인 대결'
        actionButton={
          <Link href='/battle/short'>
            <ShortsIcon />
          </Link>
        }
      />
      <Container>
        <Genres shouldNeedAll />
        <BattleList>
          {BATTLE_LIST_DUMMY.map((battle: Battle, idx) => (
            <BattleCard {...battle} key={idx} />
          ))}
        </BattleList>
      </Container>
      <BottomNav />
    </>
  );
}

const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 3.7rem;
`;

const BattleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
