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
    albumCoverUrl: '',
    singer: '',
  });

  const { data: battleMusic } = useQuery<PostBattleInfo>(
    ['post', 'battle', postId],
    () => getPostBattleData(parseInt(postId as string)),
    {
      enabled: !!postId,
    },
  );

  return (
    <Container>
      <Title>What&apos;s next?</Title>
      <Musics>
        {battleMusic && (
          <>
            <MusicInfo
              musicName={battleMusic.music.musicName}
              musicUrl={battleMusic.music.musicUrl}
              albumCoverUrl={battleMusic.music.albumCoverUrl}
              singer={battleMusic.music.singer}
            />
            <MusicInfo
              musicName={myListMusic.musicName}
              musicUrl={myListMusic.musicUrl}
              albumCoverUrl={myListMusic.albumCoverUrl}
              singer={myListMusic.singer}
            />
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
