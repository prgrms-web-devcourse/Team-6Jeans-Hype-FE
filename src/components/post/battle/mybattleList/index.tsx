import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import AlbumPoster from '@/components/common/AlbumPoster';
import ConfirmModal from '@/components/common/ConfirmModal';
import { COLOR } from '@/constants/color';

import { useState } from 'react';
import { BattleApplyModal, MyBattlePostInfo } from '../types';
import { getMyBattleListData } from './api';

interface Props {
  genre?: string;
  updateMyMusicCard: (musicData: BattleApplyModal) => void;
}

function MyBattleList({ genre, updateMyMusicCard }: Props) {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMusicData, setModalMusicData] = useState<BattleApplyModal>({
    postId: 0,
    title: '',
    musicUrl: '',
    albumCoverUrl: '',
    singer: '',
    // albumCoverUrl: '',
  });

  const openPostModal = () => setModalStatus(true);
  const closePostModal = () => setModalStatus(false);

  const onClickPost = ({ postId, title, musicUrl, albumCoverUrl, singer }: BattleApplyModal) => {
    setModalTitle(`[${singer}]${title}을 선택하셨습니다. 대결신청 하시겠습니까?`);

    setModalMusicData({
      postId,
      title,
      musicUrl,
      albumCoverUrl,
      singer,
    });

    openPostModal();
  };

  const onClickConfirm = (musicData: BattleApplyModal) => {
    updateMyMusicCard(musicData);

    closePostModal();
  };

  const onClickCancel = () => closePostModal();

  const { data: myBattleMusicList } = useQuery(['post', 'battle', genre], () => getMyBattleListData(genre as string), {
    enabled: !!genre,
  });

  return (
    <Container>
      <Title>내 음악 목록</Title>
      <MyList>
        {myBattleMusicList && myBattleMusicList.length > 0 ? (
          myBattleMusicList.map(({ postId, music: { title, singer, albumCoverUrl } }: MyBattlePostInfo) => (
            <Post
              key={postId}
              onClick={() => {
                const musicData = {
                  postId,
                  title,
                  musicUrl:
                    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f8/bc/4b/f8bc4b45-5ee4-5805-f74f-3675b099eeb0/mzaf_5690449198553966261.plus.aac.p.m4a',
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
        title={modalTitle}
        musicData={modalMusicData}
        openStatus={modalStatus}
        onClickConfirm={onClickConfirm}
        onClickCancel={onClickCancel}
      />
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
