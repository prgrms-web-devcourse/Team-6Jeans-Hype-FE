import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import HeaderSubmitButton from '@/components/common/button/SubmitButton';
import Header from '@/components/common/Header';
import Toast from '@/components/common/Toast';
import { createPost } from '@/components/post/create/api';
import PostCreate from '@/components/post/create/index';
import { Genre, Music, Values } from '@/components/post/create/types';
import { useToast } from '@/hooks/useToast';

function Create() {
  const router = useRouter();

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
        <PostCreate
          values={{ musicInfo, selectedGenre, description, battleAvailability }}
          onChangeValues={onChangeValues}
          onChangeMusicInfo={onChangeMusicInfo}
          onSubmit={onSubmit}
        />
      </Container>
      {showToast && <Toast message='장르를 선택해주세요.' />}
    </AuthRequiredPage>
  );
}

export default Create;

const Container = styled.div`
  height: 100vh;
`;
