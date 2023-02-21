import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import useMusicList from '@/hooks/useMusicList';
import styled from '@emotion/styled';
import { memo, useEffect } from 'react';
import { selectedMusicInfo } from '../types';
import RenderMusics from './renderMusics';
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

function MusicSearcher() {
  const { selectedId, tmpKeyword, keyword, onChangeKeyword, onClickInMusicList } = useMusicList();

  return (
    <MusicSearchContainer>
      <Searcher>
        <span>음악 검색:</span>
        <input value={tmpKeyword} onChange={onChangeKeyword} />
      </Searcher>
      <MusicListContainer>
        {keyword.length > 0 && <RenderMusics onClickInMusicList={onClickInMusicList} keyword={keyword} />}
      </MusicListContainer>
      <div>{selectedId && <RenderSelectedMusic id={selectedId} />}</div>
    </MusicSearchContainer>
  );
}

export default memo(MusicSearcher, (p, n) => JSON.stringify(p) === JSON.stringify(n));
