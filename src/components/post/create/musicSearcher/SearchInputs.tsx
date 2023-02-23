import styled from '@emotion/styled';

const Searcher = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  & > * {
    height: calc(100%);
  }
  & > input {
    padding: 0 10px;
    width: calc(100% - 50px);
    background-color: #eff3f6;
    border-radius: 3px 0 0 3px;
  }
`;

const SearcherButton = styled.button`
  width: 50px;
  border-radius: 3px;
  background: linear-gradient(98.38deg, #7d74dc -1.83%, #7697ec 86.44%);
  & > img {
    width: 25px;
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
