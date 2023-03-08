import styled from '@emotion/styled';
import BottomArrowIcon from 'public/images/down-arrow-gray.svg';

import { COLOR } from '@/constants/color';

interface FilterProps<T> {
  selected: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

export default function Filter<T extends string>({ selected, options, onChange }: FilterProps<T>) {
  return (
    <Container>
      <Select value={selected} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </Select>
      <StyledBottomArrowIcon />
    </Container>
  );
}

const Select = styled.select`
  font-weight: 700;
  font-size: 10px;
  line-height: 14px;
  color: ${COLOR.gray};
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.4rem;
  width: min-content;
  padding-right: 1.3rem;
  text-align: center;
`;

const Container = styled.div`
  position: relative;
  align-self: flex-end;
`;

const StyledBottomArrowIcon = styled(BottomArrowIcon)`
  position: absolute;
  left: calc(100% - 1rem);
  top: 50%;
  transform: translateY(-50%);
`;
