import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import AuthRequiredPage from '@/components/auth/AuthRequiredPage';
import Header from '@/components/common/Header';
import NoContent from '@/components/common/NoContent';
import MusicList from '@/components/post/search/MusicList';
import SearchInput from '@/components/post/search/SearchInput';
import { searchedKeyword, searchedTempKeyword } from '@/components/post/search/store';

function SearchMusics() {
  const router = useRouter();
  const [keyword, setKeyword] = useRecoilState(searchedKeyword);
  const [tmpKeyword, setTmpKeyword] = useRecoilState(searchedTempKeyword);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTmpKeyword(value);
  };

  const onClickInSearchButton = useCallback(() => {
    setKeyword(tmpKeyword);
  }, [setKeyword, tmpKeyword]);

  const onClickInMusicList = (trackId: number) => {
    router.push(`/post/create?trackId=${trackId}`);
  };

  return (
    <AuthRequiredPage>
      <Container>
        <Header title='추천 글쓰기' backUrl='/' />
        <SearchInput
          keyword={tmpKeyword}
          onChangeKeyword={onChangeKeyword}
          onClickInSearchButton={onClickInSearchButton}
        />
        {keyword ? (
          <MusicList onClickInMusicList={onClickInMusicList} keyword={keyword} />
        ) : (
          <Wrapper>
            <NoContent text='검색 후 음악을 선택해주세요.' isImage width={8} />
          </Wrapper>
        )}
      </Container>
    </AuthRequiredPage>
  );
}

export default SearchMusics;

const Container = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;
