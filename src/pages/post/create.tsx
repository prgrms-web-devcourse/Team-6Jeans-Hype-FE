import { useRouter } from 'next/router';
import { useState } from 'react';

import Header from '@/components/common/Header';
import HeaderSubmitButton from '@/components/common/Header/SubmitButton';
import Toast from '@/components/common/Toast';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import { createPost } from '@/components/post/api';
import PostCreate from '@/components/post/create/index';
import { Values } from '@/components/post/create/types';
import usePostCreate from '@/hooks/useCreatePost';

function Create() {
  const {
    values: { musicInfo, selectedGenre, description, battleAvailability },
    onChangeValues,
    onChangeMusicInfo,
  } = usePostCreate();
  const router = useRouter();

  const [showToast, setShowToast] = useState(false);

  const onSubmit = async () => {
    const postInfo: Values = {
      musicInfo,
      selectedGenre,
      description,
      battleAvailability,
    };
    if (selectedGenre === undefined) {
      setShowToast(true);
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
      {showToast && <Toast message='장르를 선택해주세요.' />}
    </AuthRequiredPage>
  );
}

export default Create;
