import useMusicList from '@/hooks/useMusicList';
import styled from '@emotion/styled';
import { memo } from 'react';
import { MusicInfo } from '../types';
import RenderMusicList from './RenderMusicList';
import RenderSelectedMusic from './RenderSelectedMusic';
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
  onChangeMusicInfo(music: MusicInfo): void;
}

function MusicSearcher({ onChangeMusicInfo }: Props) {
  const { selectedMusic, keywords, tmpKeywords, onChangeKeyword, onClickInSearchButton, onClickInMusicList } =
    useMusicList();

  return (
    <MusicSearchContainer>
      <MusicInputContainer>
        <SearchInputs
          keywords={tmpKeywords}
          onChangeKeyword={onChangeKeyword}
          onClickInSearchButton={onClickInSearchButton}
        />
      </MusicInputContainer>
      <MusicListContainer>
        {keywords.trackName && keywords.artistName && (
          <RenderMusicList
            onChangeMusicInfo={onChangeMusicInfo}
            onClickInMusicList={onClickInMusicList}
            keywords={keywords}
          />
        )}
      </MusicListContainer>
      {selectedMusic.trackId && <RenderSelectedMusic selectedMusic={selectedMusic} />}
    </MusicSearchContainer>
  );
}

export default memo(MusicSearcher, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
