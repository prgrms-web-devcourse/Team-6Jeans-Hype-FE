import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { PlayIcon } from '@/components/battle/detail/BattleMusic/style';
import AlbumPoster from '@/components/common/AlbumPoster';
import MusicPlayButton from '@/components/common/MusicPlayButton';
import { COLOR } from '@/constants/color';

import { Music } from './types';

interface Props {
  selectedMusic: Music;
}

function SelectedMusic({ selectedMusic }: Props) {
  const router = useRouter();
  const { trackName, artistName, previewUrl, artworkUrl100 } = selectedMusic;
  const [isPlay, setIsPlay] = useState(true);

  const clickButton = () => {
    setIsPlay(!isPlay);
    console.log(isPlay);
  };

  return (
    <>
      <Header>
        <span>선택한 음악</span>
        <button type='button' onClick={() => router.push('/post/searchMusics')} style={{ cursor: 'pointer' }}>
          <img src={'/images/post-cancel-button.svg'} alt='img' />
        </button>
      </Header>
      <SelectedMusicInfo>
        <PosterAndPreview>
          <AlbumPoster lazy={true} src={artworkUrl100} size={10} />
          <PlayIcon value={previewUrl}>
            <MusicPlayButton src={previewUrl} isMusicPlay={isPlay} updatePlayStatus={clickButton} />
          </PlayIcon>
        </PosterAndPreview>
        <TrackName>{trackName}</TrackName>
        <ArtistName>{artistName}</ArtistName>
      </SelectedMusicInfo>
    </>
  );
}

export default SelectedMusic;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > span {
    font-size: 1.4rem;
    font-weight: 700;
  }
`;

const SelectedMusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2.9rem;
`;

const PosterAndPreview = styled.div`
  position: relative;
`;

const TrackName = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.7rem;
  line-height: 1.8rem;
  padding: 0 2rem;
`;

const ArtistName = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${COLOR.gray};
  padding: 0 2rem;
`;
