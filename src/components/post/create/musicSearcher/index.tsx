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
const MusicListContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
  border: 1px solid #eff3f6;
  border-radius: 3px;
  border-top: 0;
  background-color: #f6f9fb;
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
      <MusicListContainer>
        {keyword && (
          <RenderMusicList
            onChangeMusicInfo={onChangeMusicInfo}
            onClickInMusicList={onClickInMusicList}
            keyword={keyword}
          />
        )}
      </MusicListContainer>
      {selectedMusic.trackId && <RenderSelectedMusic onChangeValues={onChangeValues} selectedMusic={selectedMusic} />}
    </MusicSearchContainer>
  );
}

export default memo(MusicSearcher, (prev, next) => JSON.stringify(prev) === JSON.stringify(next));
