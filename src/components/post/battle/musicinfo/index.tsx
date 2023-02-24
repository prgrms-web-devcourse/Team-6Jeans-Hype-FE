import { BattleMusicInfo } from '../types';

function MusicInfo({ musicName, musicUrl, thumbnailUrl, singer, genre }: BattleMusicInfo) {
  return (
    <div
      style={{
        width: '400px',
        height: '250px',
        backgroundColor: 'yellow',
        marginBottom: '10px',
      }}
    >
      <div>노래 제목 : {musicName}</div>
      <div>
        <audio src={musicUrl} controls loop></audio>
      </div>
      <div>장르 : {genre?.genreName}</div>
      <div>가수 : {singer}</div>
      <img
        src={thumbnailUrl}
        alt='썸네일 이미지'
        style={{
          width: '100px',
          height: '100px',
        }}
      />
    </div>
  );
}

export default MusicInfo;
