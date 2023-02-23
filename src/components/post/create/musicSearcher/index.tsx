import useMusicList from '@/hooks/useMusicList';
import styled from '@emotion/styled';
import { memo } from 'react';
import { Music } from '../types';
import RenderMusicList from './MusicList';
import RenderSelectedMusic from './SelectedMusic';
import SearchInputs from './SearchInputs';

const MusicSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface Props {
  onChangeMusicInfo(music: Music): void;
  onChangeValues: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function MusicSearcher({ onChangeMusicInfo, onChangeValues }: Props) {
  const { selectedMusic, keyword, tmpKeyword, onChangeKeyword, onClickInSearchButton, onClickInMusicList } =
    useMusicList();

  return (
    <MusicSearchContainer>
      <SearchInputs
        keyword={tmpKeyword}
        onChangeKeyword={onChangeKeyword}
        onClickInSearchButton={onClickInSearchButton}
      />

      {keyword && (
        <RenderMusicList
          onChangeMusicInfo={onChangeMusicInfo}
          onClickInMusicList={onClickInMusicList}
          keyword={keyword}
        />
      )}

      {selectedMusic.trackId && <RenderSelectedMusic onChangeValues={onChangeValues} selectedMusic={selectedMusic} />}
    </MusicSearchContainer>
  );
}

export default memo(MusicSearcher, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
