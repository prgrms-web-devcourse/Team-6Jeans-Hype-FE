import Header from '@/components/common/Header';
import PostSearchMusics from '@/components/post/SearchMusics/index';
import useSearchMusics from '@/hooks/useSearchMusics';

function SearchMusics() {
  const { keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList } = useSearchMusics();

  return (
    <>
      <Header title='추천 글쓰기' shouldNeedBack={false} selectedColor='deepblue' />
      <PostSearchMusics
        keyword={keyword}
        tmpKeyword={tmpKeyword}
        onChangeKeyword={onChangeKeyword}
        onClickInSearchButton={onClickInSearchButton}
        onClickInMusicList={onClickInMusicList}
      />
    </>
  );
}

export default SearchMusics;
