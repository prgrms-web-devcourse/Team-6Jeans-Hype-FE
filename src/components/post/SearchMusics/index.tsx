import styled from '@emotion/styled';
import { memo } from 'react';

import { COLOR } from '@/constants/color';

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
        <InitContainer>
          <img src={'/images/translucent-logo.svg'} />
          <span>검색 후 음악을 선택하세요.</span>
        </InitContainer>
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

const InitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  & > img {
    width: 8rem;
  }
  & > span {
    padding-top: 3rem;
    color: ${COLOR.gray};
  }
`;
