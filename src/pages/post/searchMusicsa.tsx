import PostSearchMusics from '@/components/post/SearchMusics/index';
import useSearchMusics from '@/hooks/useSearchMusics';

function SearchMusics() {
  const { keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList } = useSearchMusics();

  return (
    <PostSearchMusics
      keyword={keyword}
      tmpKeyword={tmpKeyword}
      onChangeKeyword={onChangeKeyword}
      onClickInSearchButton={onClickInSearchButton}
      onClickInMusicList={onClickInMusicList}
    />
  );
}

export default SearchMusics;
