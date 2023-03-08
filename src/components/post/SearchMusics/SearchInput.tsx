import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

interface Props {
  keyword: string;
  onChangeKeyword: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClickInSearchButton(): void;
}

function SearchInput({ keyword, onChangeKeyword, onClickInSearchButton }: Props) {
  return (
    <SearchContainer>
      <Title>음악 검색</Title>
      <Searcher onSubmit={(e) => e.preventDefault()}>
        <Input
          name='trackName'
          value={keyword}
          onChange={onChangeKeyword}
          autoComplete='off'
          placeholder='제목과 가수를 입력해주세요.'
        />
        <SearcherButton type='submit' onClick={onClickInSearchButton}>
          <img src={'/images/search-icon.svg'} alt='img' />
        </SearcherButton>
      </Searcher>
    </SearchContainer>
  );
}

export default SearchInput;

const SearchContainer = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  margin: 1rem 0;
  padding-left: 0.8rem;
`;

const Searcher = styled.form`
  width: 100%;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(90deg, rgba(162, 116, 220, 1) -1.83%, rgba(101, 141, 244, 1) 86.44%);
  box-shadow: 0 0 1.5rem rgba(158, 158, 158, 0.25);
`;

const Input = styled.input`
  padding: 0 1rem;
  width: calc(100% - 4.6rem);
  border-radius: 0.9rem 0 0 0.9rem;
  background-color: ${COLOR.white};
  height: calc(100% - 0.2rem);
  color: ${COLOR.deepBlue};
  font-size: 1.25rem;

  &::placeholder {
    color: ${COLOR.lightGray};
  }
`;

const SearcherButton = styled.button`
  width: 2.4rem;
  border-radius: 0 0.9rem 0.9rem 0;
  height: calc(100% - 0.2rem);
  background-color: ${COLOR.white};
  border: 0;
  cursor: pointer;

  & > img {
    width: 1.1rem;
  }
`;
