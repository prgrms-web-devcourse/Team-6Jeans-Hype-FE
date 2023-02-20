import styled from '@emotion/styled';
import Toggle from '../common/Toggle';
import MusicSearcher from './musicSearcher/index';
import { TrackInfo, ValuesType } from './types';

const CreateContainer = styled.form`
  display: flex;
  flex-direction: column;
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
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickMusic(track: TrackInfo): React.MouseEventHandler<HTMLDivElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

function PostCreate({ values, onChange, onClickMusic, onSubmit }: Props) {
  return (
    <CreateContainer onSubmit={onSubmit}>
      <CreateRow>
        <MusicSearcher onClickMusic={onClickMusic} />
      </CreateRow>
      <CreateRow>
        <span>설명:</span>
        <textarea value={values.description} onChange={onChange} name='description' />
      </CreateRow>
      <CreateRow>
        <span>대결 가능</span>
        <Toggle name='battleAvailability' disabled={false} onChange={onChange} />
      </CreateRow>
      <button type='submit'>료카이</button>
    </CreateContainer>
  );
}

export default PostCreate;
