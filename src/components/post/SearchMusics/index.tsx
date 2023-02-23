import useMusicList from '@/hooks/useSearchMusics';
import styled from '@emotion/styled';
import { memo } from 'react';
import SearchInput from './SearchInput';
import MusicList from './MusicList';
import { Music } from './types';

const MusicSearchContainer = styled.div`
  width: calc(100% - 30px);
  max-width: 765px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

interface Props {
  keyword: string;
  tmpKeyword: string;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
  onClickInMusicList(music: string): void;
}

function SearchMusics({ keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList }: Props) {
  return (
    <MusicSearchContainer>
      <SearchInput
        keyword={tmpKeyword}
        onChangeKeyword={onChangeKeyword}
        onClickInSearchButton={onClickInSearchButton}
      />
      {keyword && <MusicList onClickInMusicList={onClickInMusicList} keyword={keyword} />}
    </MusicSearchContainer>
  );
}

export default memo(SearchMusics, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
