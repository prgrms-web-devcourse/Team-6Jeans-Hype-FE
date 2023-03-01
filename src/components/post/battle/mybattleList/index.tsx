import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { COLOR } from '@/constants/color';
import useConfirmModal from '@/hooks/useConfirmModal';

import { MyBattlePostInfo } from '../types';
import { getMyBattleListData } from './api';

interface Props {
  genre?: string;
}

function MyBattleList({ genre }: Props) {
  const { musicData, isOpened, onClickBattleButton, onClickConfirmButton, onClickCancelButton } = useConfirmModal();

  const { data: myBattleMusicList } = useQuery<MyBattlePostInfo[]>(
    ['post', 'battle', genre],
    () => getMyBattleListData(genre as string),
    {
      enabled: !!genre,
    },
  );

  return (
    <Container>
      <Title>내 음악 목록</Title>
      <MyList>
        {myBattleMusicList && myBattleMusicList.length > 0 ? (
          myBattleMusicList.map((list: MyBattlePostInfo) => (
            <Post
              key={list.postId}
              onClick={() => onClickBattleButton({ title: list.music.musicName, singer: list.music.singer })}
            >
              <Thumbnail>{list.music.thumbnailUrl}</Thumbnail>
              <TitleSinger>
                <div>{list.music.musicName}</div>
                <div>{list.music.singer}</div>
              </TitleSinger>
            </Post>
          ))
        ) : (
          <div>리스트가 없습니다</div>
        )}
      </MyList>
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
    </Container>
  );
}

export default MyBattleList;

const Container = styled.div``;

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  display: flex;
  align-items: center;

  color: ${COLOR.deepBlue};

  margin-bottom: 2rem;
`;

const MyList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Post = styled.div`
  background: ${COLOR.white};
  box-shadow: 0 0 1rem rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const Thumbnail = styled.div`
  background-image: url('http://www.akbobada.com/home/akbobada/archive/akbo/img/20150115102222.jpg');
  background-position: center center;

  border: 0.5px solid #dddddd;
  border-radius: 1rem;

  width: 5rem;
  height: 5rem;
  margin-right: 2rem;
`;

const TitleSinger = styled.div`
  & div:first-of-type {
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.7rem;

    color: ${COLOR.deepBlue};

    margin-bottom: 0.5rem;
  }

  & div:last-of-type {
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.8rem;

    color: ${COLOR.gray};
  }
`;
