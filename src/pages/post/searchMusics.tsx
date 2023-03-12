import styled from '@emotion/styled';

import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import PostSearchMusics from '@/components/post/SearchMusics/index';
import useSearchMusics from '@/hooks/useSearchMusics';

function SearchMusics() {
  const { keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList } = useSearchMusics();

  return (
    <AuthRequiredPage>
      <Container>
        <Header title='추천 글쓰기' backUrl='/' />
        <PostSearchMusics
          keyword={keyword}
          tmpKeyword={tmpKeyword}
          onChangeKeyword={onChangeKeyword}
          onClickInSearchButton={onClickInSearchButton}
          onClickInMusicList={onClickInMusicList}
        />
      </Container>
    </AuthRequiredPage>
  );
}

export default SearchMusics;

const Container = styled.div`
  height: 100vh;
`;
