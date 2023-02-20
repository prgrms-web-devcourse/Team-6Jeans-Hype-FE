import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { getMusicData } from '@/utils/apis/music';
import { MusicInfo, TrackInfo } from '../types';

interface Props {
  onClickMusic(track: TrackInfo): void;
}

function MusicSearcher({ onClickMusic }: Props) {
  const [keyword, setKeyword] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce(async (keyword: string) => {
      setIsLoading(true);
      const response = await getMusicData(keyword);
      setMusicList(response);
      setIsLoading(false);
    }, 500),
  ).current;

  const onClick = (track: TrackInfo) => {
    onClickMusic(track);
    setKeyword(track.title);
    setMusicList([]);
  };

  const getMusic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setKeyword(value);
    debouncedSearch(value);
  };

  const renderMusics = () => {
    return musicList.length > 0 ? (
      musicList.map((music: MusicInfo) => {
        const { key, title, subtitle, images } = music.track;

        return (
          <div
            style={{
              border: '1px solid',
              margin: '5px',
              cursor: 'pointer',
            }}
            key={key}
            className='musicInfo'
            onClick={() => onClick(music.track)}
          >
            <img src={images.coverart} alt='img' width={100} />
            <div>
              {title} / {subtitle}
            </div>
          </div>
        );
      })
    ) : (
      <div>결과없음</div>
    );
  };

  return (
    <div>
      <span>음악 검색:</span>
      <input value={keyword} onChange={getMusic} />
      <div>{isLoading ? <div>로딩중입니다</div> : renderMusics()}</div>
    </div>
  );
}

export default MusicSearcher;
