import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPostBattleData } from './api';
import MusicInfo from './musicinfo';
import { PostBattleInfo } from './types';

function PostBattle() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: battleMusic, isLoading } = useQuery<PostBattleInfo>(
    ['post', 'battle', postId],
    () => getPostBattleData(parseInt(postId as string)),
    {
      enabled: !!postId,
    },
  );

  const navigatePostMyBattleList = () => {
    const { music } = battleMusic as PostBattleInfo;
    router.push(`/post/battle/mybattlelist?postId=${postId}&genre=${music.genre?.genreName}`);
  };

  return (
    <>
      {isLoading || !battleMusic ? (
        <></>
      ) : (
        <>
          <MusicInfo
            musicName={battleMusic.music.musicName}
            musicUrl={battleMusic.music.musicUrl}
            thumbnailUrl={battleMusic.music.thumbnailUrl}
            singer={battleMusic.music.singer}
            genre={battleMusic.music.genre}
          />
          <button onClick={navigatePostMyBattleList}>내 대결 곡 고르기</button>
        </>
      )}
    </>
  );
}

export default PostBattle;
