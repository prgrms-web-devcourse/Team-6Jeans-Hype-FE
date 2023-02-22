function MusicInfo({ musicData }: any) {
  return (
    <div
      style={{
        width: '400px',
        height: '250px',
        backgroundColor: 'yellow',
        marginBottom: '10px',
      }}
    >
      <div>노래 제목 : {musicData.musicName}</div>
      <div>
        <audio src={musicData.musicUrl} controls loop></audio>
      </div>
      <div>장르 : {musicData.genre.genreName}</div>
      <div>가수 : {musicData.singer}</div>
      <img
        src={musicData.thumbnailUrl}
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
