import styled from '@emotion/styled';

import { Music } from './types';

interface Props {
  selectedMusic: Music;
}

function SelectedMusic({ selectedMusic }: Props) {
  const { trackName, artistName, previewUrl, artworkUrl100 } = selectedMusic;

  return (
    <div>
      <h4 style={{ fontWeight: 'bold' }}>당신이 선택한 음악은</h4>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            {trackName} - {artistName}
          </div>
          <div></div>
          <div>
            <img src={artworkUrl100} style={{ width: '100px', height: '100px' }} alt='img' />
          </div>
          <Player>
            <audio src={previewUrl} controls loop />
          </Player>
        </div>
      </div>
    </div>
  );
}

export default SelectedMusic;

const Player = styled.div`
  width: 3rem;
  height: 3rem;
  overflow: hidden;
  border-radius: 50%;
  border: 0.1rem solid #cccccc;
  box-sizing: content-box;
  & > audio {
    margin-top: -12px;
    margin-left: -11px;
    display: block;
  }
`;
