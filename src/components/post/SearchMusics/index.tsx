import styled from '@emotion/styled';
import { memo } from 'react';

import NoContent from '@/components/common/NoContent';

import MusicList from './MusicList';
import SearchInput from './SearchInput';

interface Props {
  keyword: string;
  tmpKeyword: string;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
  onClickInMusicList(trackId: number): void;
}

function SearchMusics({ keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList }: Props) {
  return (
    <MusicSearchContainer>
      <SearchInput
        keyword={tmpKeyword}
        onChangeKeyword={onChangeKeyword}
        onClickInSearchButton={onClickInSearchButton}
      />
      {keyword ? (
        <MusicList onClickInMusicList={onClickInMusicList} keyword={keyword} />
      ) : (
        <Container>
          <NoContent text='검색 후 음악을 선택해주세요.' isImage width={8} />
        </Container>
      )}
    </MusicSearchContainer>
  );
}

export default memo(SearchMusics, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));

const MusicSearchContainer = styled.div`
  width: calc(100% - 3rem);
  max-width: 76.5rem;
  padding: 0 1.5rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;
