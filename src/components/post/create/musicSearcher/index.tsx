import { debounce } from 'lodash';
import { useRef, useState } from 'react';
import { getMusicData, getMusicDetailData } from '@/utils/apis/music';
import { MusicInfo, TrackInfo } from '../types';

interface Props {
  onClickMusic(track: selectedMusicInfo): void;
}

interface selectedMusicInfo {
  id: string;
  musicTitle: string;
  singerName: string;
  coverArt: string;
  genre: string;
  m4a: string;
}

function MusicSearcher({ onClickMusic }: Props) {
  const [keyword, setKeyword] = useState('');
  const [musicList, setMusicList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState<selectedMusicInfo>({
    id: '',
    musicTitle: '',
    singerName: '',
    coverArt: '',
    genre: '',
    m4a: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce(async (keyword: string) => {
      setIsLoading(true);
      setMusicList(await getMusicData(keyword));
      setIsLoading(false);
    }, 500),
  ).current;

  const onClickInMusicList = async (track: TrackInfo) => {
    const { title, subtitle, images, hub } = track;

    setKeyword(title);
    setMusicList([]);

    const result = await getMusicDetail(hub.actions[0].id);
    const selectedMusicObject: selectedMusicInfo = {
      id: hub.actions[0].id,
      musicTitle: title,
      singerName: subtitle,
      coverArt: images.coverart,
      genre: result.attributes.genreNames,
      m4a: hub.actions[1].uri,
    };

    setSelectedMusic(selectedMusicObject);
    onClickMusic(selectedMusicObject);
  };

  const getMusicList = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setKeyword(value);
    debouncedSearch(value);
  };

  const getMusicDetail = async (id: string) => {
    setIsLoading(true);
    const response = await getMusicDetailData(id);
    setIsLoading(false);

    return response;
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
            onClick={() => onClickInMusicList(music.track)}
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

  const renderSelectedMusic = () => {
    return <div>당신이 선택한 음악은 {selectedMusic.musicTitle}</div>;
  };

  return (
    <div>
      <span>음악 검색:</span>
      <input value={keyword} onChange={getMusicList} />
      <div>{isLoading ? <div>로딩중입니다</div> : renderMusics()}</div>
      <div>{isLoading ? <div>로딩중입니다</div> : renderSelectedMusic()}</div>
    </div>
  );
}

export default MusicSearcher;
