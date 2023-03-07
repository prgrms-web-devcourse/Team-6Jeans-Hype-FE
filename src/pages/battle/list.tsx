import styled from '@emotion/styled';
import Link from 'next/link';
import ShortsIcon from 'public/images/shuffle.svg';
import { useEffect, useState } from 'react';

import BattleList from '@/components/battle/list';
import { useGetBattleList } from '@/components/battle/list/hooks/useGetBattles';
import { GenreValue, isGenreValue } from '@/components/battle/list/types';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

export default function BattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const { data: battleList, refetch: refetchBattleList } = useGetBattleList(genreValue);

  const onChangeGenre = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGenreValue = e.target.value;
    if (selectedGenreValue === 'ALL') {
      setGenreValue(undefined);
      return;
    }
    if (!isGenreValue(selectedGenreValue)) {
      return;
    }
    setGenreValue(selectedGenreValue);
  };

  useEffect(() => {
    refetchBattleList();
  }, [genreValue, refetchBattleList]);

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
        <Genres shouldNeedAll onChange={onChangeGenre} />
        {battleList && <BattleList battleList={battleList} />}
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
  padding-bottom: 8rem;
`;
