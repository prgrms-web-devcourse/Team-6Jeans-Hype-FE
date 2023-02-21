import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import useMusicList from '@/hooks/useMusicList';
import { getMusicData, getMusicDetailData } from '@/utils/apis/music';
import styled from '@emotion/styled';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { Loadings, MusicInfo, selectedMusicInfo, TrackInfo } from '../types';

const Ellipsis = styled.span`
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Player = styled.div`
  width: 30px;
  height: 30px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #cccccc;
  box-sizing: content-box;
  & > audio {
    margin-top: -12px;
    margin-left: -11px;
    display: block;
  }
`;
interface Props {
  onClickMusic(track: selectedMusicInfo): void;
}

function MusicSearcher({ onClickMusic }: Props) {
  const { keyword, musicList, selectedMusic, isLoading, onChangeKeyword, onClickInMusicList } = useMusicList({
    onClickMusic,
  });

  const renderMusics = () => {
    return musicList?.length > 0 ? (
      musicList.map((music: MusicInfo) => {
        const { key, title, subtitle, images } = music.track;

        return (
          <div
            style={{
              border: '1px solid',
              margin: '5px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            key={key}
            className='musicInfo'
            onClick={() => onClickInMusicList(music.track)}
          >
            <img src={images.coverart} alt='img' width={100} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Ellipsis>{title}</Ellipsis>
              <span>{subtitle}</span>
            </div>
          </div>
        );
      })
    ) : (
      <div>결과없음</div>
    );
  };

  const renderSelectedMusic = () => {
    return (
      <div>
        {selectedMusic.musicTitle.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid' }}>
            <h4 style={{ fontWeight: 'bold' }}>당신이 선택한 음악은</h4>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div>
                {selectedMusic.musicTitle} - {selectedMusic.singerName}
              </div>
              <div></div>
              <div>
                <img src={selectedMusic.coverArt} width={100} />
              </div>
              <div>{selectedMusic.genre}</div>
              <Player>
                <audio src={selectedMusic.m4a} controls loop></audio>
              </Player>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <span>음악 검색:</span>
      <input value={keyword} onChange={onChangeKeyword} />
      {keyword.length > 0 ? (
        isLoading.listLoading ? (
          <div>
            <MusicListSkeleton />
            <MusicListSkeleton />
            <MusicListSkeleton />
          </div>
        ) : (
          renderMusics()
        )
      ) : (
        <div style={{ textAlign: 'center' }}>추천할 음악을 검색하세요</div>
      )}
      <div>
        {isLoading.detailLoading ? (
          <div style={{ border: '1px solid' }}>
            <MusicListSkeleton />
          </div>
        ) : (
          renderSelectedMusic()
        )}
      </div>
    </div>
  );
}

export default MusicSearcher;
