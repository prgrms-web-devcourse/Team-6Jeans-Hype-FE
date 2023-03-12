import styled from '@emotion/styled';

import Header from '@/components/common/Header';
import HeaderSubmitButton from '@/components/common/Header/SubmitButton';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import PostCreate from '@/components/post/create/index';
import usePostCreate from '@/hooks/useCreatePost';

function Create() {
  const { values, onChangeValues, onChangeMusicInfo, onSubmit } = usePostCreate();

  return (
    <AuthRequiredPage>
      <Container>
        <Header
          title='추천 글쓰기'
          backUrl='/post/searchMusics'
          actionButton={<HeaderSubmitButton onClick={onSubmit} />}
        />
        <PostCreate
          values={values}
          onChangeValues={onChangeValues}
          onChangeMusicInfo={onChangeMusicInfo}
          onSubmit={onSubmit}
        />
      </Container>
    </AuthRequiredPage>
  );
}

export default Create;

const Container = styled.div`
  height: 100vh;
`;
