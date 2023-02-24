import useConfirmModal from '@/hooks/useConfirmModal';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { MyBattlePostInfo } from '../types';
import { getMyBattleListData } from './api';

function MyBattleList() {
  const router = useRouter();
  const { genre } = router.query;

  const { musicData, isOpened, onClickBattleButton, onClickConfirmButton, onClickCancelButton } = useConfirmModal();

  const { data: myBattleMusicList } = useQuery<MyBattlePostInfo[]>(
    ['post', 'battle', genre],
    () => getMyBattleListData(genre as string),
    {
      enabled: !!genre,
    },
  );

  return (
    <>
      {myBattleMusicList && myBattleMusicList.length > 0 ? (
        myBattleMusicList.map((list: MyBattlePostInfo) => (
          <div key={list.postId}>
            <div>{list.music.musicName}</div>
            <div>{list.music.thumbnailUrl}</div>
            <div>{list.music.singer}</div>
            <button
              onClick={() =>
                onClickBattleButton({ postId: list.postId, title: list.music.musicName, singer: list.music.singer })
              }
              style={{
                width: '40px',
                height: '30px',
                backgroundColor: 'gray',
                cursor: 'pointer',
              }}
            >
              VS
            </button>
          </div>
        ))
      ) : (
        <div>리스트가 없습니다</div>
      )}
      {isOpened && (
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'wheat',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: '0 auto',
          }}
        >
          <span>{`[${musicData.singer}]${musicData.title}`}</span>
          <span>선택 하시겠습니까?</span>

          <button onClick={onClickConfirmButton}>예</button>
          <button onClick={onClickCancelButton}>취소</button>
        </div>
      )}
    </>
  );
}

export default MyBattleList;
