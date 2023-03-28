import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import BattleMusic from '@/components/battle/detail/BattleMusic';
import HeaderSubmitButton from '@/components/common/button/SubmitButton';
import Header from '@/components/common/Header';
import { createBattle, getPostBattleData } from '@/components/post/battle/api';
import MyBattleList from '@/components/post/battle/MyBattleList';
import SelectMusic from '@/components/post/battle/SelectMusic';
import { BattleApplyModal } from '@/components/post/battle/types';
import { COLOR } from '@/constants/color';
import useBattleMusicPlay from '@/hooks/useBattleMusicPlay';

function Battle() {
  const router = useRouter();
  const { postId: selectedOpponentMusicId } = router.query;

  const { isLeftMusicPlay, isRightMusicPlay, clickLeftButton, clickRightButton } = useBattleMusicPlay();

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

    const isSuccessFetch = await createBattle(+selectedOpponentMusicId, selectedMyMusic.postId);
    if (!isSuccessFetch?.success) {
      alert(isSuccessFetch?.message);
      return;
    }

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
    <AuthRequiredPage>
      <Header title='대결 신청' actionButton={isReadySubmit && <HeaderSubmitButton onClick={applyBattle} />} />
      <Container>
        <Title>What&apos;s next?</Title>
        <Musics>
          {battleMusic && (
            <>
              <BattleMusic
                isMusicPlay={isLeftMusicPlay}
                updatePlayStatus={clickLeftButton}
                music={battleMusic.music}
                opponentMusicUrl={selectedMyMusic.musicUrl}
              />
              <SelectMusic
                isMusicPlay={isRightMusicPlay}
                updatePlayStatus={clickRightButton}
                music={selectedMyMusic}
                opponentMusicUrl={battleMusic.music.musicUrl}
                onClick={renderMyList}
              />
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
    </AuthRequiredPage>
  );
}

export default Battle;

const Container = styled.div`
  height: 100vh;
  padding: 0 2rem;
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
