import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPostBattleData } from './api';
import MusicInfo from './musicinfo';

function PostBattle() {
  const router = useRouter();
  const { postId } = router.query;

  const { data: battleMusic, isLoading } = useQuery<any>(
    ['post', 'battle', postId],
    () => getPostBattleData(parseInt(postId as any)),
    {
      enabled: !!postId,
      select: (res) => res.music,
    },
  );

  const navigatePostMyBattleList = () => {
    router.push(`/post/battle/mybattlelist?postId=${postId}&genre=${battleMusic.genre.genreName}`);
  };

  return (
    <>
      {isLoading || !battleMusic ? (
        <></>
      ) : (
        <>
          <MusicInfo musicData={battleMusic} />
          <button onClick={navigatePostMyBattleList}>내 대결 곡 고르기</button>
        </>
      )}
    </>
  );
}

export default PostBattle;
