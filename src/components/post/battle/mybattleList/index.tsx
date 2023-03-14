import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AlbumPoster from '@/components/common/AlbumPoster';
import AlertModal from '@/components/common/Modal/Alert';
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

  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState('');
  const [modalMusicData, setModalMusicData] = useState<BattleApplyModal>({
    postId: 0,
    title: '',
    musicUrl: '',
    albumCoverUrl: '',
    singer: '',
  });

  const openPostModal = () => setIsOpenConfirmModal(true);
  const closePostModal = () => setIsOpenConfirmModal(false);

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

  const onClickAlertModal = () => {
    router.push('/post');
  };

  const { data: myBattleMusicList, isLoading } = useQuery(
    ['post', 'battle', 'mylist', selectedOpponentMusicId],
    () => getMyBattleListData(selectedOpponentMusicId),
    {
      enabled: !!selectedOpponentMusicId,
      onError: (error: Error) => {
        setAlertModalMessage(
          // FIXME: 서버에서 보내주는 에러 메시지 수정 하기 전 임시 처리
          error.message === '직접 작성한 추천글은 대결신청할 수 없습니다.'
            ? `본인이 작성한 추천글은\n대결 신청 할 수 없습니다.`
            : error.message,
        );
      },
    },
  );

  useEffect(() => {
    if (alertModalMessage.length) {
      setIsOpenAlertModal(true);
    }
  }, [alertModalMessage]);

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
    <>
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
          isOpen={isOpenConfirmModal}
          text={`${modalMusicData.singer} - ${modalMusicData.title}을 선택하셨습니다.\n 대결신청 하시겠습니까?`}
          onClickCancel={onClickCancel}
          onClickConfirm={onClickConfirm}
        />
      </Container>
      <AlertModal isOpen={isOpenAlertModal} text={alertModalMessage} onClick={onClickAlertModal} />
    </>
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
