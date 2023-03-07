import Header from '@/components/common/Header';
import AuthRequiredPage from '@/components/login/AuthRequiredPage';
import PostSearchMusics from '@/components/post/SearchMusics/index';
import useSearchMusics from '@/hooks/useSearchMusics';

function SearchMusics() {
  const { keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList } = useSearchMusics();

  return (
    <AuthRequiredPage>
      <Header title='추천 글쓰기' backUrl='/' />
      <PostSearchMusics
        keyword={keyword}
        tmpKeyword={tmpKeyword}
        onChangeKeyword={onChangeKeyword}
        onClickInSearchButton={onClickInSearchButton}
        onClickInMusicList={onClickInMusicList}
      />
    </AuthRequiredPage>
  );
}

export default SearchMusics;
