import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getMyBattleListData } from './api';

function MyBattleList() {
  const router = useRouter();
  const { genre } = router.query;

  const { data: myBattleMusicList } = useQuery<any>(
    ['post', 'battle', genre],
    () => getMyBattleListData(genre as any),
    {
      enabled: !!genre,
      select: (res) => {
        return res.map((item: any) => item.data.posts[0]);
      },
    },
  );

  return (
    <>
      {myBattleMusicList?.length > 0 ? (
        myBattleMusicList.map((list: any) => (
          <div key={list.postId}>
            <div>{list.music.musicName}</div>
            <div>{list.music.thumbnailUrl}</div>
            <div>{list.music.singer}</div>
          </div>
        ))
      ) : (
        <div>리스트가 없습니다</div>
      )}
    </>
  );
}

export default MyBattleList;
