import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AlbumPoster from '@/components/common/AlbumPoster';
import ConfirmModal from '@/components/common/Modal/Confirm';
import NoContent from '@/components/common/NoContent';
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
      <Text>내 추천 목록</Text>
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
              <AlbumPoster lazy={true} src={albumCoverUrl} size={6.6} />
              <MusicInfo>
                <Title>{title}</Title>
                <Artist>{singer}</Artist>
              </MusicInfo>
            </Post>
          ))
        ) : (
          <Wrapper>
            <NoContent text='작성한 추천 글이 없습니다.' isImage width={8} />
          </Wrapper>
        )}
      </MyList>

      <ConfirmModal
        isOpened={modalStatus}
        text={`[${modalMusicData.singer}]${modalMusicData.title}을 선택하셨습니다.\n 대결신청 하시겠습니까?`}
        onClickCancel={onClickCancel}
        onClickConfirm={onClickConfirm}
      />
    </Container>
  );
}

export default MyBattleList;

const Container = styled.div<{ isVisibleMusicList: boolean }>`
  display: ${({ isVisibleMusicList }) => (isVisibleMusicList ? 'block' : 'none')};
  position: relative;
`;

const Text = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  color: ${COLOR.deepBlue};
  margin-bottom: 2rem;
  padding-left: 1rem;
`;

const MyList = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 47rem);
  overflow-y: auto;
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

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  padding-left: 1.3rem;
  width: calc(100% - 9.5rem);
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.7rem;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Artist = styled.h2`
  font-weight: 500;
  font-size: 1rem;
  color: ${COLOR.gray};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
