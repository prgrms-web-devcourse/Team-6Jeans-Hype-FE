import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { getPostBattleData } from './api';
import MusicInfo from './musicinfo';
import { PostBattleInfo } from './types';
import MyBattleList from './mybattleList';

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
            <MusicInfo
              musicName={battleMusic.music.musicName}
              musicUrl={battleMusic.music.musicUrl}
              thumbnailUrl={battleMusic.music.thumbnailUrl}
              singer={battleMusic.music.singer}
            />
            <MusicInfo
              musicName={myListMusic.musicName}
              musicUrl={myListMusic.musicUrl}
              thumbnailUrl={myListMusic.thumbnailUrl}
              singer={myListMusic.singer}
            />
            {/* <button onClick={navigatePostMyBattleList}>내 대결 곡 고르기</button> */}
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
