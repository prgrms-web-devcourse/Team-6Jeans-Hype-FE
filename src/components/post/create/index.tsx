import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Genres from '@/components/common/Genres';
import { getMusicDetailData } from '@/utils/apis/music';

import Toggle from '../../common/Toggle';
import SelectedMusic from './SelectedMusic';
import { Music, Values } from './types';

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
      <Row>{isLoading ? <div>로딩중,,,</div> : <SelectedMusic selectedMusic={values.musicInfo} />}</Row>
      <Row>
        <Genres title='장르 선택' onChange={onChangeValues} />
      </Row>
      <Row>
        <span>설명(추천이유):</span>
        <textarea
          name='description'
          value={values.description}
          onChange={onChangeValues}
          style={{ border: '1px solid #bdbdbd' }}
        />
      </Row>
      <Row>
        <span>대결 가능</span>
        <Toggle name='battleAvailability' disabled={false} onChange={onChangeValues} on={values.battleAvailability} />
      </Row>
      <button type='submit' style={{ cursor: 'pointer' }}>
        submit
      </button>
    </CreateContainer>
  );
}

export default PostCreate;

const CreateContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 2.5rem);
  max-width: 40rem;
  margin: 0 auto;
  margin-top: 5rem;
`;
const Row = styled.div`
  padding-bottom: 1rem;
  width: 100%;

  & > span {
    margin-right: 1rem;
  }
`;
