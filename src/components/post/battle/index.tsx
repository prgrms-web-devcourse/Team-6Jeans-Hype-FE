import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getPostBattleData } from './api';
import { PostBattleInfo } from './types';
import MyBattleList from './mybattleList';
import BattleMusicInfo from '@/components/common/BattleMusicInfo';

function PostBattle() {
  const router = useRouter();
  const { postId } = router.query;

  const [myListMusic, setMyListMusic] = useState({
    musicName: '내 대결 곡 고르기',
    musicUrl: '',
    thumbnailUrl: '',
    singer: '',
  });

  const { data: battleMusic } = useQuery<PostBattleInfo>(
    ['post', 'battle', postId],
    () => getPostBattleData(parseInt(postId as string)),
    {
      enabled: !!postId,
    },
  );

  const navigatePostMyBattleList = () => {
    router.push(`/post/battle/mybattlelist?postId=${postId}&genre=${battleMusic?.music.genre?.genreName}`);
  };

  return (
    <Container>
      <Title>What&apos;s next?</Title>
      <Musics>
        {battleMusic && (
          <>
            <BattleMusicInfo music={battleMusic.music} />
            <BattleMusicInfo music={myListMusic} onClick={() => console.log('select song')} />
          </>
        )}
      </Musics>
      <MyBattleList genre={battleMusic?.music.genre?.genreName} />
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

  background: linear-gradient(98.38deg, #7d74dc -1.83%, #7697ec 86.44%);
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
