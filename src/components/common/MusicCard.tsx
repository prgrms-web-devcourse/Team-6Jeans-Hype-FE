import styled from '@emotion/styled';

import { Music } from '@/components/post/search/types';
import { COLOR } from '@/constants/color';

import AlbumPoster from './AlbumPoster';

interface Prop {
  music: Music;
  onClickMusicList(): void;
}

function MusicCard({ music, onClickMusicList }: Prop) {
  const { trackId, trackName, artistName, artworkUrl100 } = music;

  return (
    <Card key={trackId} onClick={onClickMusicList}>
      <AlbumPoster lazy={true} src={artworkUrl100} size={6.6} />
      <MusicInfo>
        <Title>{trackName}</Title>
        <Artist>{artistName}</Artist>
      </MusicInfo>
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

const MusicInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  padding-left: 1.3rem;
  width: calc(100% - 9.5rem);
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 1.3rem;
  line-height: 1.7rem;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Artist = styled.h2`
  font-weight: 500;
  font-size: 1rem;
  color: ${COLOR.gray};
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
