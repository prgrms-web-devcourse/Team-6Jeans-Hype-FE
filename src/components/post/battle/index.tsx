import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Header from '@/components/common/Header';
import HeaderSubmitButton from '@/components/common/Header/SubmitButton';
import { COLOR } from '@/constants/color';

import { getPostBattleData } from './api';
import { createBattle } from './api';
import MyBattleList from './mybattleList';
import { BattleApplyModal } from './types';

function BattleForm() {
  const router = useRouter();
  const { postId: selectedOpponentMusicId } = router.query;

  const [isReadySubmit, setIsReadySubmit] = useState(false);
  const [isVisibleMusicList, setIsVisibleMusicList] = useState(false);

  const [selectedMyMusic, setSelectedMyMusic] = useState<BattleApplyModal>({
    postId: 0,
    title: '내 대결 곡 고르기',
    musicUrl: '',
    singer: '',
    albumCoverUrl: '',
  });

  const renderMyList = () => setIsVisibleMusicList(true);

  const updateMyMusicCard = (musicData: BattleApplyModal) => {
    setSelectedMyMusic(musicData);
    setIsReadySubmit(true);
  };

  const applyBattle = async () => {
    if (typeof selectedOpponentMusicId !== 'string') return;

    await createBattle(+selectedOpponentMusicId, selectedMyMusic.postId);
    router.push(`/battle/list`);
  };

  const { data: battleMusic } = useQuery(
    ['post', 'battle', selectedOpponentMusicId],
    () => {
      if (typeof selectedOpponentMusicId !== 'string') return;

      return getPostBattleData(+selectedOpponentMusicId);
    },
    {
      enabled: !!selectedOpponentMusicId,
    },
  );

  return (
    <Container>
      <Header
        title='대결 신청'
        backUrl={`/post/detail?postId=${selectedOpponentMusicId}`}
        actionButton={isReadySubmit && <HeaderSubmitButton onClick={applyBattle} />}
      />
      <Title>What&apos;s next?</Title>
      <Musics>
        {battleMusic && (
          <>
            <BattleMusicInfo music={battleMusic.music} />
            <BattleMusicInfo music={selectedMyMusic} onClick={renderMyList} />
          </>
        )}
      </Musics>
      {typeof selectedOpponentMusicId === 'string' && (
        <MyBattleList
          selectedOpponentMusicId={selectedOpponentMusicId}
          updateMyMusicCard={updateMyMusicCard}
          isVisibleMusicList={isVisibleMusicList}
        />
      )}
    </Container>
  );
}

export default BattleForm;

const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(98.38deg, ${COLOR.purple} -1.83%, ${COLOR.blue} 86.44%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 7rem;
`;

const Musics = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4rem;
`;
