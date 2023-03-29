import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import HeaderSubmitButton from '@/components/common/button/SubmitButton';
import Genres from '@/components/common/Genres';
import Header from '@/components/common/Header';
import Box from '@/components/common/skeleton/Box';
import Toast from '@/components/common/Toast';
import { createPost, getMusicDetailData } from '@/components/post/create/api';
import Inputs from '@/components/post/create/Inputs';
import SelectedMusic from '@/components/post/create/SelectedMusic';
import { Genre, Music, Values } from '@/components/post/create/types';
import { useToast } from '@/hooks/useToast';

function Create() {
  const router = useRouter();
  const { trackId } = router.query;
  const { isLoading } = useQuery(['musicDetail', trackId], () => getMusicDetailData(trackId as string), {
    onSuccess: (musicDetail) => {
      const newMusic: Music = {
        trackId: musicDetail?.trackId,
        trackName: musicDetail?.trackName,
        artistName: musicDetail?.artistName,
        artworkUrl100: musicDetail?.artworkUrl100,
        previewUrl: musicDetail?.previewUrl,
      };

      onChangeMusicInfo(newMusic);
    },
  });

  const { showToast, handleToast } = useToast();

  const [musicInfo, setMusicInfo] = useState<Music>({
    trackId: -1,
    trackName: '',
    artistName: '',
    artworkUrl100: '',
    previewUrl: '',
  });
  const [selectedGenre, setSelectedGenre] = useState<Genre | undefined>(undefined);
  const [description, setDescription] = useState<string>('');
  const [battleAvailability, setBattleAvailability] = useState<boolean>(true);

  const onChangeValues = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    if (name === 'battleAvailability') {
      setBattleAvailability((prev) => !prev);
    } else if (name === 'description') {
      setDescription(value);
    } else if (name === 'genre') {
      setSelectedGenre(value as Genre);
    }
  };

  const onChangeMusicInfo = (infos: Music) => {
    setMusicInfo(infos);
  };

  const onSubmit = async () => {
    const postInfo: Values = {
      musicInfo,
      selectedGenre,
      description,
      battleAvailability,
    };
    if (selectedGenre === undefined) {
      handleToast();
    } else {
      const response = await createPost(postInfo);
      if (response) {
        //to-do 추천글 상세로 이동하기
        router.push('/post');
      }
    }
  };

  return (
    <AuthRequiredPage>
      <Container>
        <Header
          title='추천 글쓰기'
          backUrl='/post/searchMusics'
          actionButton={<HeaderSubmitButton onClick={onSubmit} />}
        />
        <Form>
          <Row>
            {isLoading ? (
              <>
                <SkeletonContainer>
                  <Box width={100} height={100} />
                </SkeletonContainer>
              </>
            ) : (
              <SelectedMusic selectedMusic={musicInfo} />
            )}
          </Row>
          <Row>
            <Genres title='장르 선택' onChange={onChangeValues} />
          </Row>
          <Row>
            <Inputs onChangeValues={onChangeValues} values={{ description, battleAvailability }} />
          </Row>
        </Form>
      </Container>
      {showToast && <Toast message='장르를 선택해주세요.' />}
    </AuthRequiredPage>
  );
}

export default Create;

const Container = styled.div`
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 5.2rem);
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Row = styled.div`
  margin-bottom: 2.9rem;
  width: 100%;
  & > span {
    margin-right: 1rem;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
