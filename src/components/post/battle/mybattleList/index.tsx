import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';
import useConfirmModal from '@/hooks/useConfirmModal';

import { MyBattlePostInfo } from '../types';
import { getMyBattleListData } from './api';

interface Props {
  genre?: string;
}

function MyBattleList({ genre }: Props) {
  const { musicData, isOpened, onClickBattleButton, onClickConfirmButton, onClickCancelButton } = useConfirmModal();

  const { data: myBattleMusicList } = useQuery(['post', 'battle', genre], () => getMyBattleListData(genre as string), {
    enabled: !!genre,
  });

  return (
    <Container>
      <Title>내 음악 목록</Title>
      <MyList>
        {myBattleMusicList && myBattleMusicList.length > 0 ? (
          myBattleMusicList.map(({ postId, music: { title, singer, albumCoverUrl } }: MyBattlePostInfo) => (
            <Post key={postId} onClick={() => onClickBattleButton({ title: title, singer: singer })}>
              <AlbumPoster lazy={true} size={5} src={albumCoverUrl} />
              {/* <AlbumPoster lazy={true} size={5} src={albumCoverUrl} /> */}
              <TitleSinger>
                <div>{title}</div>
                <div>{singer}</div>
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

const TitleSinger = styled.div`
  margin-left: 2rem;

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
