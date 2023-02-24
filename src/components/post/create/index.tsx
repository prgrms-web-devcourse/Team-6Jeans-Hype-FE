import { getMusicData, getMusicDetailData } from '@/utils/apis/music';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Toggle from '../../common/Toggle';
import SelectedMusic from './SelectedMusic';
import { Music, Values } from './types';

const CreateContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 25px);
  max-width: 400px;
  margin: 0 auto;
  margin-top: 50px;
`;
const CreateRow = styled.div`
  padding-bottom: 10px;
  width: 100%;

  & > span {
    margin-right: 10px;
  }
`;

interface Props {
  values: Values;
  onChangeValues: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChangeMusicInfo(music: Music): void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

function PostCreate({ values, onChangeValues, onChangeMusicInfo, onSubmit }: Props) {
  const router = useRouter();
  const { trackId } = router.query;
  const { data: musicDetail, isLoading } = useQuery(['musicDetail', trackId], () =>
    getMusicDetailData(trackId as string),
  );

  useEffect(() => {
    if (!isLoading) {
      const newMusic: Music = {
        trackId: musicDetail.trackId,
        trackName: musicDetail.trackName,
        artistName: musicDetail.artistName,
        artworkUrl100: musicDetail.artworkUrl100,
        previewUrl: musicDetail.previewUrl,
      };

      onChangeMusicInfo(newMusic);
    }
  }, [isLoading]);

  return (
    <CreateContainer onSubmit={onSubmit}>
      <CreateRow>
        {isLoading ? (
          <div>로딩중,,,</div>
        ) : (
          <SelectedMusic selectedMusic={values.musicInfo} onChangeValues={onChangeValues} />
        )}
      </CreateRow>
      <CreateRow>
        <span>설명(추천이유):</span>
        <textarea
          name='description'
          value={values.description}
          onChange={onChangeValues}
          style={{ border: '1px solid #bdbdbd' }}
        />
      </CreateRow>
      <CreateRow>
        <span>대결 가능</span>
        <Toggle name='battleAvailability' disabled={false} onChange={onChangeValues} on={values.battleAvailability} />
      </CreateRow>
      <button type='submit' style={{ cursor: 'pointer' }}>
        submit
      </button>
    </CreateContainer>
  );
}

export default PostCreate;
