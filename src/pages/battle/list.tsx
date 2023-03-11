import styled from '@emotion/styled';
import Link from 'next/link';
import ShortsIcon from 'public/images/shuffle.svg';
import { useState } from 'react';

import { BATTLE_STATUS_NAME_LIST, BATTLE_STATUS_VALUE_MAP } from '@/components/battle/constants';
import BattleList from '@/components/battle/list';
import { useGetBattleList } from '@/components/battle/list/hooks/useGetBattles';
import { GenreValue, isGenreValue } from '@/components/battle/list/types';
import { BattleStatusName } from '@/components/battle/types';
import BottomNav from '@/components/common/BottomNav';
import Filter from '@/components/common/Filter';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

export default function BattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const [status, setStatus] = useState<BattleStatusName>('진행중');
  const { data: battleList } = useGetBattleList({
    genre: genreValue,
    status: BATTLE_STATUS_VALUE_MAP[status],
  });

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

  const onChangeFilter = (option: BattleStatusName) => {
    setStatus(option);
  };

  return (
    <>
      <Header
        title='한눈에 보는 대결'
        shouldNeedBack={false}
        actionButton={
          <Link href='/battle/short'>
            <ShortsIcon />
          </Link>
        }
      />
      <Container>
        <StyledGenres shouldNeedAll onChange={onChangeGenre} />
        <Filter selected={status} options={BATTLE_STATUS_NAME_LIST} onChange={onChangeFilter} />
        {battleList && <StyledBattleList battleList={battleList} />}
      </Container>
      <BottomNav />
    </>
  );
}

const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 9.5rem;
`;

const StyledGenres = styled(Genres)`
  margin-bottom: 1.4rem;
`;

const StyledBattleList = styled(BattleList)`
  margin-top: 1.3rem;
`;
