import useMusicList from '@/hooks/useMusicList';
import styled from '@emotion/styled';
import { memo } from 'react';
import { Music } from '../types';
import RenderMusicList from './MusicList';
import RenderSelectedMusic from './SelectedMusic';
import SearchInputs from './SearchInputs';

const MusicSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MusicInputContainer = styled.div`
  height: 100px;
  display: flex;
  justify-content: center;
`;

const MusicListContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
`;

interface Props {
  onChangeMusicInfo(music: Music): void;
}

function MusicSearcher({ onChangeMusicInfo }: Props) {
  const { selectedMusic, keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList } =
    useMusicList();

  return (
    <MusicSearchContainer>
      <MusicInputContainer>
        <SearchInputs
          keyword={tmpKeyword}
          onChangeKeyword={onChangeKeyword}
          onClickInSearchButton={onClickInSearchButton}
        />
      </MusicInputContainer>
      <MusicListContainer>
        {keyword && (
          <RenderMusicList
            onChangeMusicInfo={onChangeMusicInfo}
            onClickInMusicList={onClickInMusicList}
            keyword={keyword}
          />
        )}
      </MusicListContainer>
      {selectedMusic.trackId && <RenderSelectedMusic selectedMusic={selectedMusic} />}
    </MusicSearchContainer>
  );
}

export default memo(MusicSearcher, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
