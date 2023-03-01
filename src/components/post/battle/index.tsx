import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Header from '@/components/common/Header';
import { COLOR } from '@/constants/color';

import { getPostBattleData } from './api';
import MyBattleList from './mybattleList';
import { PostBattleInfo } from './types';

function PostBattle() {
  const router = useRouter();
  const { postId } = router.query;

  const [myListMusic, setMyListMusic] = useState({
    musicName: '내 대결 곡 고르기',
    musicUrl: '',
    albumCoverUrl: '',
    singer: '',
  });

  const { data: battleMusic } = useQuery(
    ['post', 'battle', postId],
    () => getPostBattleData(parseInt(postId as string)),
    {
      enabled: !!postId,
    },
  );

  return (
    <Container>
      <Header title='대결 신청' subButtonValue='완료' />
      <Title>What&apos;s next?</Title>
      <Musics>
        {battleMusic && (
          <>
            <BattleMusicInfo music={battleMusic.music} />
            <BattleMusicInfo music={myListMusic} onClick={() => console.log('select song')} />
          </>
        )}
      </Musics>
      <MyBattleList genre={battleMusic?.music.genre?.genreValue} />
    </Container>
  );
}

export default PostBattle;

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
  justify-content: space-between;
  margin-bottom: 4rem;
`;
