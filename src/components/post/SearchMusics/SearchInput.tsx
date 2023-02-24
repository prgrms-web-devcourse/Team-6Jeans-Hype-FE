import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

const SearchContainer = styled.div`
  width: 100%;
`;

const TItle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  margin: 1rem 0;
  padding-left: 0.8rem;
`;

const Searcher = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  background-color: ${COLOR.white};
  box-shadow: 0 0 1.5rem rgba(158, 158, 158, 0.25);
  border: 1px solid ${COLOR.blue};
`;

const Input = styled.input`
  padding: 0 1rem;
  width: calc(100% - 3rem);
  border-radius: 1rem 0 0 1rem;
  height: 100%;
  color: ${COLOR.deepBlue};
  font-size: 1.25rem;
`;

const SearcherButton = styled.button`
  width: 2.5rem;
  margin-right: 0.5rem;
  height: 2.5rem;
  border: 0;
  & > img {
    width: 1.1rem;
  }
`;

interface Props {
  keyword: string;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
}

function SearchInput({ keyword, onChangeKeyword, onClickInSearchButton }: Props) {
  return (
    <SearchContainer>
      <TItle>음악 검색</TItle>
      <Searcher>
        <Input
          name='trackName'
          value={keyword}
          onChange={onChangeKeyword}
          autoComplete='off'
          placeholder='ex) 아이유 좋은날'
        />
        <SearcherButton type='button' onClick={onClickInSearchButton}>
          <img src={'/images/search-icon.svg'} alt='img' />
        </SearcherButton>
      </Searcher>
    </SearchContainer>
  );
}

export default SearchInput;
