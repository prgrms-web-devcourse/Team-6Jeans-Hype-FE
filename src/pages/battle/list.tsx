import styled from '@emotion/styled';
import Link from 'next/link';
import ShortsIcon from 'public/images/shuffle.svg';
import { useEffect, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { BATTLE_STATUS_OPTION_LIST } from '@/components/battle/constants';
import BattleList from '@/components/battle/list';
import { useGetBattleList } from '@/components/battle/list/hooks/useGetBattles';
import { GenreValue, isGenreValue } from '@/components/battle/list/types';
import { BattleStatusOption } from '@/components/battle/types';
import BottomNav from '@/components/common/BottomNav';
import Filter from '@/components/common/Filter';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';

export default function BattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const { data: battleList, refetch: refetchBattleList } = useGetBattleList(genreValue);
  const [selectedOption, setSelectedOption] = useState<BattleStatusOption>('진행중');

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

  const onChangeFilter = (option: BattleStatusOption) => {
    setSelectedOption(option);
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
      <Container className={RemoveScroll.classNames.fullWidth}>
        <StyledGenres shouldNeedAll onChange={onChangeGenre} />
        <Filter selected={selectedOption} options={BATTLE_STATUS_OPTION_LIST} onChange={onChangeFilter} />
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
  padding-bottom: 8rem;
`;

const StyledGenres = styled(Genres)`
  margin-bottom: 1.4rem;
`;

const StyledBattleList = styled(BattleList)`
  margin-top: 1.3rem;
`;
