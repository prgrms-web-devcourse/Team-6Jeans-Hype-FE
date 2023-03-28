import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import Genres from '@/components/common/Genres';
import Box from '@/components/common/skeleton/Box';
import { COLOR } from '@/constants/color';

import Toggle from '../../common/Toggle';
import { getMusicDetailData } from '../api';
import SelectedMusic from './SelectedMusic';
import { Music, Values } from './types';

interface Props {
  values: Values;
  onChangeValues: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChangeMusicInfo(music: Music): void;
  onSubmit: () => void;
}

function PostCreate({ values, onChangeValues, onChangeMusicInfo, onSubmit }: Props) {
  const router = useRouter();
  const { trackId } = router.query;
  const { isLoading } = useQuery(['musicDetail', trackId], () => getMusicDetailData(trackId as string), {
    onSuccess: (musicDetail) => {
      const newMusic: Music = {
        trackId: musicDetail?.trackId,
        trackName: musicDetail?.trackName,
        artistName: musicDetail?.artistName,
        artworkUrl100: musicDetail?.artworkUrl100,
        previewUrl: musicDetail?.previewUrl,
      };

      onChangeMusicInfo(newMusic);
    },
  });

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <CreateContainer onSubmit={submit}>
      <Row>
        {isLoading ? (
          <>
            <SkeletonContainer>
              <Box width={100} height={100} />
            </SkeletonContainer>
          </>
        ) : (
          <SelectedMusic selectedMusic={values.musicInfo} />
        )}
      </Row>
      <Row>
        <Genres title='장르 선택' onChange={onChangeValues} />
      </Row>
      <Row>
        <Title>내 한마디</Title>
        <Description
          name='description'
          value={values.description}
          onChange={onChangeValues}
          placeholder='선택한 음악에 대한 아무 말이나 써보세요 ...'
        />
      </Row>
      <Row>
        <BattleAvailability>
          <span>대결 가능</span>
          <Toggle name='battleAvailability' disabled={false} onChange={onChangeValues} on={values.battleAvailability} />
        </BattleAvailability>
      </Row>
    </CreateContainer>
  );
}

export default PostCreate;

const CreateContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 5.2rem);
  margin: 0 auto;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Row = styled.div`
  margin-bottom: 2.9rem;
  width: 100%;
  & > span {
    margin-right: 1rem;
  }
  &:last-child {
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Description = styled.textarea`
  width: calc(100% - 1.9rem);
  min-height: 10rem;
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  padding-top: 1.7rem;
  padding-left: 1.9rem;
  color: ${COLOR.deepBlue};
  font-weight: 500;
  font-size: 1.25rem;

  &::placeholder {
    color: ${COLOR.lightGray};
    font-weight: 400;
  }
`;

const BattleAvailability = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
`;
