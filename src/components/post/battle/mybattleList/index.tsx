import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AlbumPoster from '@/components/common/AlbumPoster';
import ConfirmModal from '@/components/common/Modal/Confirm';
import MusicListSkeleton from '@/components/common/skeleton/MusicListSkeleton';
import { COLOR } from '@/constants/color';

import { BattleApplyModal, MyBattlePostInfo } from '../types';
import { getMyBattleListData } from './api';

interface Props {
  selectedOpponentMusicId: string;
  updateMyMusicCard: (musicData: BattleApplyModal) => void;
  isVisibleMusicList: boolean;
}

function MyBattleList({ selectedOpponentMusicId, updateMyMusicCard, isVisibleMusicList }: Props) {
  const router = useRouter();

  const [modalStatus, setModalStatus] = useState(false);
  const [modalMusicData, setModalMusicData] = useState<BattleApplyModal>({
    postId: 0,
    title: '',
    musicUrl: '',
    albumCoverUrl: '',
    singer: '',
  });

  const openPostModal = () => setModalStatus(true);
  const closePostModal = () => setModalStatus(false);

  const onClickPost = ({ postId, title, musicUrl, albumCoverUrl, singer }: BattleApplyModal) => {
    setModalMusicData({
      postId,
      title,
      musicUrl,
      albumCoverUrl,
      singer,
    });

    openPostModal();
  };

  const onClickConfirm = () => {
    updateMyMusicCard(modalMusicData);

    closePostModal();
  };

  const onClickCancel = () => closePostModal();

  const { data: myBattleMusicList, isLoading } = useQuery(
    ['post', 'battle', 'mylist', selectedOpponentMusicId],
    () => getMyBattleListData(selectedOpponentMusicId),
    {
      enabled: !!selectedOpponentMusicId,
      onError: (err) => {
        const errors = err as Error | AxiosError;

        alert(errors.message);
        router.push('/post');
      },
    },
  );

  if (isLoading) {
    return (
      <>
        <MusicListSkeleton />
        <MusicListSkeleton />
        <MusicListSkeleton />
      </>
    );
  }

  return (
    <Container isVisibleMusicList={isVisibleMusicList}>
      <Title>내 음악 목록</Title>
      <MyList>
        {myBattleMusicList && myBattleMusicList.length > 0 ? (
          myBattleMusicList.map(({ postId, music: { title, singer, albumCoverUrl, musicUrl } }: MyBattlePostInfo) => (
            <Post
              key={postId}
              onClick={() => {
                const musicData = {
                  postId,
                  title,
                  musicUrl,
                  albumCoverUrl,
                  singer,
                };
                onClickPost(musicData);
              }}
            >
              <AlbumPoster lazy={true} size={5} src={albumCoverUrl} />
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

      <ConfirmModal
        isOpened={modalStatus}
        text={`${modalMusicData.singer} - ${modalMusicData.title}을 선택하셨습니다.\n 대결신청 하시겠습니까?`}
        onClickCancel={onClickCancel}
        onClickConfirm={onClickConfirm}
      />
    </Container>
  );
}

export default MyBattleList;

const Container = styled.div<{ isVisibleMusicList: boolean }>`
  display: ${({ isVisibleMusicList }) => (isVisibleMusicList ? 'block' : 'none')};
`;

const Title = styled.div`
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
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.7rem;

    color: ${COLOR.deepBlue};

    margin-bottom: 0.5rem;
  }

  & div:last-of-type {
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 1.8rem;

    color: ${COLOR.gray};
  }
`;
