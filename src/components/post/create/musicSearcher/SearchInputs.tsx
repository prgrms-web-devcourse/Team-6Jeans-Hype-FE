import styled from '@emotion/styled';

const Searcher = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;

  & > input {
    padding: 0 10px;
    width: calc(100% - 60px);
    box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
    border-radius: 10px;
    border: 1px solid #7893ea;
    height: 100%;
  }
`;

const SearcherButton = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #7697ec;
  border: 0;
  & > img {
    width: 10px;
  }
`;

interface Props {
  keyword: string;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
}

function SearchInputs({ keyword, onChangeKeyword, onClickInSearchButton }: Props) {
  return (
    <Searcher>
      <input
        name='trackName'
        value={keyword}
        onChange={onChangeKeyword}
        autoComplete='off'
        placeholder='ex) 아이유 좋은날'
      />
      <SearcherButton type='button' onClick={onClickInSearchButton}>
        <img src={'/images/search.png'} alt='img' />
      </SearcherButton>
    </Searcher>
  );
}

export default SearchInputs;
