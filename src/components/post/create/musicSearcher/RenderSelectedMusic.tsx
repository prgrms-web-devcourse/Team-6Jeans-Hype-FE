import styled from '@emotion/styled';
import { MusicInfo } from '../types';

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
  selectedMusic: MusicInfo;
}

function RenderSelectedMusic({ selectedMusic }: Props) {
  return (
    <div>
      <h4 style={{ fontWeight: 'bold' }}>당신이 선택한 음악은</h4>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div>
            {selectedMusic.trackName} - {selectedMusic.artistName}
          </div>
          <div></div>
          <div>
            <img src={selectedMusic.artworkUrl100} style={{ width: '100px', height: '100px' }} />
          </div>
          <Player>
            <audio src={selectedMusic.previewUrl} controls loop></audio>
          </Player>
        </div>
      </div>
    </div>
  );
}

export default RenderSelectedMusic;
