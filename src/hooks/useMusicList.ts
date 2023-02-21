import { Loadings, selectedMusicInfo, TrackInfo, ValuesType } from '@/components/post/create/types';
import { getMusicData, getMusicDetailData } from '@/utils/apis/music';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';

interface Props {
  onClickMusic(track: selectedMusicInfo): void;
}

const useMusicList = ({ onClickMusic }: Props) => {
  const [keyword, setKeyword] = useState<string>('');
  const [musicList, setMusicList] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState<selectedMusicInfo>({
    id: '',
    musicTitle: '',
    singerName: '',
    coverArt: '',
    genre: '',
    m4a: '',
  });
  const [isLoading, setIsLoading] = useState<Loadings>({
    isFirst: true,
    listLoading: false,
    detailLoading: false,
  });

  const onClickInMusicList = async (track: TrackInfo) => {
    const { title, subtitle, images, hub } = track;

    setKeyword('');
    setMusicList([]);

    const result = await getMusicDetail(hub.actions[0].id);
    const { genreNames } = result.attributes;
    const genre = genreNames[0] === 'K-Pop' ? genreNames[2] : genreNames[0];

    const selectedMusicObject: selectedMusicInfo = {
      id: hub.actions[0].id,
      musicTitle: title,
      singerName: subtitle,
      coverArt: images.coverart,
      genre: genre,
      m4a: hub.actions[1].uri,
    };

    setSelectedMusic(selectedMusicObject);
    onClickMusic(selectedMusicObject);
  };

  const onChangeKeyword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
    getMusicList(value);
  };

  const getMusicList = useRef(
    debounce(async (keyword: string) => {
      setIsLoading({ ...isLoading, listLoading: true });
      setMusicList(await getMusicData(keyword));
      setIsLoading({ ...isLoading, listLoading: false });
    }, 500),
  ).current;

  const getMusicDetail = async (id: string) => {
    setIsLoading({ ...isLoading, detailLoading: true });
    const response = await getMusicDetailData(id);
    setIsLoading({ ...isLoading, detailLoading: false });

    return response;
  };

  return { keyword, musicList, selectedMusic, isLoading, onChangeKeyword, onClickInMusicList };
};

export default useMusicList;
