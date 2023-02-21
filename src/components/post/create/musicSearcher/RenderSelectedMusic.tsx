import MusicListSkeleton from '@/components/common/skeleton/MusicList';
import usePostCreate from '@/hooks/usePostCreate';
import { getMusicDetail } from '@/hooks/useQueryCreatePost';
import styled from '@emotion/styled';
import { selectedMusicInfo } from '../types';

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
  id: string;
}

function RenderSelectedMusic({ id }: Props) {
  const { data, isLoading } = getMusicDetail(id);
  const { onChangeMusicInfo } = usePostCreate();

  const render = () => {
    const { id, attributes } = data;

    const { genreNames } = attributes;
    const genre = genreNames[0] === 'K-Pop' ? genreNames[2] : genreNames[0];
    const coverUrl = attributes.artwork.url.replace('{w}x{h}', '100x100');

    const selectedMusic = {
      id,
      musicTitle: attributes.name,
      singerName: attributes.artistName,
      coverArt: coverUrl,
      genre,
      m4a: attributes.previews[0].url,
    };

    onChangeMusicInfo(selectedMusic);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid' }}>
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
    );
  };

  return (
    <div>
      <h4 style={{ fontWeight: 'bold' }}>당신이 선택한 음악은</h4>
      {isLoading ? (
        <>
          <MusicListSkeleton />
        </>
      ) : (
        render()
      )}
    </div>
  );
}

export default RenderSelectedMusic;
