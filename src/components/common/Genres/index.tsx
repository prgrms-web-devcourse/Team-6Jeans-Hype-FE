import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getGenres } from '@/components/post/api';
import { COLOR } from '@/constants/color';
import useGenre from '@/hooks/useGenre';

interface Props {
  shouldNeedAll?: boolean;
  shouldNeedFilter?: boolean;
  title?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

interface Genre {
  genreName: string;
  genreValue: string;
}

function Genres({ shouldNeedAll = false, shouldNeedFilter = false, title, onChange }: Props) {
  const [targetGenres, setTargetGenres] = useState<Genre[]>([]);
  const { data: genres, isLoading } = useQuery(['genres'], () => getGenres());
  const { selectedValue, onClick } = useGenre();

  useEffect(() => {
    setTargetGenres(shouldNeedAll ? [{ genreValue: 'ALL', genreName: 'ALL' }, ...genres] : genres);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onClick(e);
    onChange?.(e);
  };

  return isLoading ? (
    <></>
  ) : (
    <>
      <Titles>
        {title && <Title>{title}</Title>}
        {shouldNeedFilter && <Filter>최신순 ▽</Filter> /*mvp에선 구현 안해도 되니 영역만 잡아두었음 */}
      </Titles>
      <GenreContainer>
        <fieldset>
          <RadioGroup>
            {targetGenres?.map((genre: Genre, i: number) => (
              <div key={i}>
                <Input
                  type='radio'
                  id={`genre${i + 1}`}
                  name='genre'
                  value={genre.genreValue}
                  onChange={handleChange}
                  checked={selectedValue === genre.genreValue ? true : false}
                />
                <Label htmlFor={`genre${i + 1}`}>{genre.genreName}</Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      </GenreContainer>
    </>
  );
}

export default Genres;

const GenreContainer = styled.div`
  width: 100%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Titles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Filter = styled.div`
  color: ${COLOR.gray};
`;

const RadioGroup = styled.div`
  height: 2.6rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  align-items: flex-start;
  padding: 0.2rem 0;
  & > div:first-of-type > label {
    margin-left: 0;
  }
`;

const Input = styled.input`
  display: none;
  &:checked + label {
    font-weight: 700;
    background-color: ${COLOR.blue};
  }
`;

const Label = styled.label`
  display: block;
  cursor: pointer;
  background-color: #b9c7f4;
  color: ${COLOR.white};
  border-radius: 2rem;
  white-space: nowrap;
  padding: 0.5rem 1.5rem;
  margin-left: 1.6rem;
  font-weight: bold;
  font-size: 1.1rem;
  line-height: 1.6rem;
  text-align: center;
`;
