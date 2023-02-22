import useMusicList from '@/hooks/useMusicList';
import styled from '@emotion/styled';
import { memo } from 'react';
import { MusicInfo } from '../types';
import RenderMusicList from './RenderMusicList';
import RenderSelectedMusic from './RenderSelectedMusic';

const MusicSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Searcher = styled.div`
  display: flex;
`;

const MusicListContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
`;

interface Props {
  onChangeMusicInfo(music: MusicInfo): void;
}

function MusicSearcher({ onChangeMusicInfo }: Props) {
  const { selectedMusic, tmpKeyword, keyword, onChangeKeyword, onClickInMusicList } = useMusicList();

  return (
    <MusicSearchContainer>
      <Searcher>
        <span>음악 검색:</span>
        <input value={tmpKeyword} onChange={onChangeKeyword} />
      </Searcher>
      <MusicListContainer>
        {keyword.length > 0 && (
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
