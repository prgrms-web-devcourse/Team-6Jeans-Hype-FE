import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import { BattleMusic, BattleApplyModal } from './types';
import Header from '@/components/common/Header';
import { COLOR } from '@/constants/color';
import { getPostBattleData } from './api';
import MyBattleList from './mybattleList';
import { createBattle } from './api';

function BattleForm() {
  const router = useRouter();
  const { postId: selectedOpponentMusicId } = router.query;

  const [isReadySubmit, setIsReadySubmit] = useState(false);
  const [listViewStattus, setListViewStatus] = useState(false);

  const [selectedMyMusicId, setSelectedMyMusicId] = useState(0);
  const [selectedMyMusic, setSelectedMyMusic] = useState<BattleMusic>({
    musicName: '내 대결 곡 고르기',
    musicUrl: '',
    thumbnailUrl: '',
    singer: '',
    // albumCoverUrl: '',
  });

  const renderMyList = () => setListViewStatus(true);

  const updateMyMusicCard = (musicData: BattleApplyModal) => {
    const { postId, musicName, musicUrl, thumbnailUrl, singer } = musicData;

    setSelectedMyMusicId(postId);
    setSelectedMyMusic({
      musicName,
      musicUrl,
      thumbnailUrl,
      singer,
    });
    setIsReadySubmit(true);
  };

  const applyBattle = async () => {
    await createBattle(parseInt(selectedOpponentMusicId as string), selectedMyMusicId);
    alert('대결 신청 완료!');
  };

  const { data: battleMusic } = useQuery(
    ['post', 'battle', selectedOpponentMusicId],
    () => getPostBattleData(parseInt(selectedOpponentMusicId as string)),
    {
      enabled: !!selectedOpponentMusicId,
    },
  );

  return (
    <Container>
      <Header title='대결 신청' subButtonValue={isReadySubmit ? '확인' : ''} onClickSubButton={applyBattle} />
      <Title>What&apos;s next?</Title>
      <Musics>
        {battleMusic && (
          <>
            <BattleMusicInfo music={battleMusic.music} />
            <BattleMusicInfo music={selectedMyMusic} onClick={renderMyList} />
          </>
        )}
      </Musics>
      <MyBattleList
        genre={battleMusic?.music.genre?.genreValue}
        listView={listViewStattus}
        updateMyMusicCard={updateMyMusicCard}
      />
    </Container>
  );
}

export default BattleForm;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 1.7rem;
  line-height: 2.6rem;

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
