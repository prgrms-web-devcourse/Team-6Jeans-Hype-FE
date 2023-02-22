import styled from '@emotion/styled';
import { memo } from 'react';
import Toggle from '../../common/Toggle';
import MusicSearcher from './musicSearcher/index';
import { MusicInfo, ValuesType } from './types';

const CreateContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CreateRow = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  & > span {
    margin-right: 10px;
  }
`;

interface Props {
  values: ValuesType;
  onChangeValues: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChangeMusicInfo(music: MusicInfo): void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

function PostCreate({ values, onChangeValues, onChangeMusicInfo, onSubmit }: Props) {
  return (
    <CreateContainer onSubmit={onSubmit}>
      <CreateRow>
        <MusicSearcher onChangeMusicInfo={onChangeMusicInfo} />
      </CreateRow>
      <CreateRow>
        <span>설명(추천이유):</span>
        <textarea name='description' value={values.description} onChange={onChangeValues} />
      </CreateRow>
      <CreateRow>
        <span>대결 가능</span>
        <Toggle name='battleAvailability' disabled={false} onChange={onChangeValues} on={values.battleAvailability} />
      </CreateRow>
      <button type='submit'>submit</button>
    </CreateContainer>
  );
}

export default PostCreate;
