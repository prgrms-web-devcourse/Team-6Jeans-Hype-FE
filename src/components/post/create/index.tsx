import styled from '@emotion/styled';
import Toggle from '../../common/Toggle';
import MusicSearcher from './musicSearcher/index';
import { Music, ValuesType } from './types';

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
  values: ValuesType;
  onChangeValues: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChangeMusicInfo(music: Music): void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

function PostCreate({ values, onChangeValues, onChangeMusicInfo, onSubmit }: Props) {
  return (
    <CreateContainer onSubmit={onSubmit}>
      <CreateRow>
        <MusicSearcher onChangeValues={onChangeValues} onChangeMusicInfo={onChangeMusicInfo} />
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
