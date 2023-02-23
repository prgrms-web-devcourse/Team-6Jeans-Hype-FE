import styled from '@emotion/styled';

const Searcher = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface Props {
  keyword: string;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
}

function SearchInputs({ keyword, onChangeKeyword, onClickInSearchButton }: Props) {
  return (
    <Searcher>
      <div>
          <input name='trackName' value={keyword} onChange={onChangeKeyword} autoComplete='off' placeholder='ex) 아이유 좋은날'/>
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
