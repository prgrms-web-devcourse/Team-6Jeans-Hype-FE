import styled from '@emotion/styled';

import { Music } from '@/components/post/SearchMusics/types';
import { COLOR } from '@/constants/color';

import AlbumPoster from '../AlbumPoster';

interface Prop {
  music: Music;
  onClickMusicList(): void;
}

function MusicCard({ music, onClickMusicList }: Prop) {
  const { trackId, trackName, artistName, artworkUrl100 } = music;

  return (
    <Card key={trackId} onClick={onClickMusicList}>
      <AlbumPoster lazy={true} src={artworkUrl100} size={6.4} />
      <MusicTexts>
        <Text>
          <Ellipsis>
            <span>{trackName}</span>
          </Ellipsis>
        </Text>
        <Text>
          <Ellipsis>
            <ArtistName>{artistName}</ArtistName>
          </Ellipsis>
        </Text>
      </MusicTexts>
    </Card>
  );
}

export default MusicCard;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 1rem 0;
  height: 6.4rem;
  box-shadow: 0 0 1rem rgba(226, 226, 226, 0.25);
  background-color: ${COLOR.white};
  border-radius: 1rem;
`;

const MusicTexts = styled.div`
  width: calc(100% - 2rem - 7rem);
  height: 60%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const Text = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  line-height: 1.7rem;
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  & > span {
    font-size: 1.2rem;
  }
`;

const ArtistName = styled.div`
  color: ${COLOR.gray};
`;
