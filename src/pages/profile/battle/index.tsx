import styled from '@emotion/styled';
import { useState } from 'react';

import { BATTLE_STATUS_NAME_LIST, BATTLE_STATUS_VALUE_MAP } from '@/components/battle/constants';
import BattleList from '@/components/battle/list';
import { GenreValue, isGenreValue } from '@/components/battle/list/types';
import { BattleStatusName } from '@/components/battle/types';
import BottomNav from '@/components/common/BottomNav';
import Filter from '@/components/common/Filter';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { useGetMyBattleList } from '@/components/profile/battle/useGetMyBattleList';

export default function MyBattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const [status, setStatus] = useState<BattleStatusName>('진행중');
  const { data: myBattleList } = useGetMyBattleList({ genre: genreValue, status: BATTLE_STATUS_VALUE_MAP[status] });

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
    <AuthRequiredPage>
      <Header title='참여한 대결' />
      <Container>
        <Genres shouldNeedAll onChange={onChangeGenre} />
        <Filter selected={status} options={BATTLE_STATUS_NAME_LIST} onChange={onChangeFilter} />
        {myBattleList && <StyledBattleList battleList={myBattleList} />}
      </Container>
      <BottomNav />
    </AuthRequiredPage>
  );
}

const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 9.5rem;
`;

const StyledBattleList = styled(BattleList)`
  margin-top: 1.3rem;
`;
