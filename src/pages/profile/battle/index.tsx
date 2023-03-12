import styled from '@emotion/styled';
import { useState } from 'react';

import BattleList from '@/components/battle/list';
import { GenreValue, isGenreValue } from '@/components/battle/list/types';
import BottomNav from '@/components/common/BottomNav';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { useGetMyBattleList } from '@/components/profile/battle/useGetMyBattleList';

export default function MyBattleListPage() {
  const [genreValue, setGenreValue] = useState<GenreValue | undefined>();
  const { data: myBattleList } = useGetMyBattleList({ genre: genreValue });

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

  return (
    <AuthRequiredPage>
      <Header title='참여한 대결' />
      <Container>
        <Genres shouldNeedAll onChange={onChangeGenre} />
        {myBattleList && <BattleList battleList={myBattleList} />}
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
