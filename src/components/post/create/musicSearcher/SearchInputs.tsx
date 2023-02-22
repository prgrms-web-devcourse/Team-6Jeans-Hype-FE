import styled from '@emotion/styled';
import { KeywordInfo } from '../types';

const Searcher = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface Props {
  keywords: KeywordInfo;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
}

function SearchInputs({ keywords, onChangeKeyword, onClickInSearchButton }: Props) {
  return (
    <Searcher>
      <div>
        <div>
          제목: <input name='trackName' value={keywords.trackName} onChange={onChangeKeyword} autoComplete='off' />
        </div>
        <div>
          가수: <input name='artistName' value={keywords.artistName} onChange={onChangeKeyword} autoComplete='off' />
        </div>
      </div>
      <div>
        <button type='button' onClick={onClickInSearchButton}>
          검색하기
        </button>
      </div>
    </Searcher>
  );
}

export default SearchInputs;
