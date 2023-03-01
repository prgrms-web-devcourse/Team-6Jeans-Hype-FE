import styled from '@emotion/styled';

import AlbumPoster from '@/components/common/AlbumPoster';
import { COLOR } from '@/constants/color';

import { Music } from './types';

interface Props {
  selectedMusic: Music;
}

function SelectedMusic({ selectedMusic }: Props) {
  const { trackName, artistName, previewUrl, artworkUrl100 } = selectedMusic;

  return (
    <div>
      <Header>
        <span>선택한 음악</span>
        <button>
          <img src={'/images/post-cancel-button.svg'} />
        </button>
      </Header>
      <SelectedMusicInfo>
        <PosterAndPreview>
          <AlbumPoster lazy={true} src={artworkUrl100} size={10} blur={true} />
          <Player>
            <audio src={previewUrl} controls loop />
          </Player>
        </PosterAndPreview>
        <TrackName>{trackName}</TrackName>
        <ArtistName>{artistName}</ArtistName>
      </SelectedMusicInfo>
    </div>
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

  & > button {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #e7e7e7;
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

const Player = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 50%;
  border: 0.1rem solid ${COLOR.white};
  margin: 0 auto;
  box-sizing: content-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > audio {
    margin-top: -1.2rem;
    margin-left: -1.1rem;
    display: block;
  }
`;

const TrackName = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.7rem;
  line-height: 19px;
`;

const ArtistName = styled.div`
  font-family: 'Poppins_500';
  font-style: normal;
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: ${COLOR.gray};
`;
