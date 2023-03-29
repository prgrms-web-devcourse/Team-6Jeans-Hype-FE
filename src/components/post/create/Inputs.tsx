import styled from '@emotion/styled';

import Toggle from '@/components/common/Toggle';
import { COLOR } from '@/constants/color';

import { InputsValue } from './types';

interface Props {
  values: InputsValue;
  onChangeValues: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function Inputs({ values, onChangeValues }: Props) {
  return (
    <>
      <Title>내 한마디</Title>
      <Description
        name='description'
        value={values.description}
        onChange={onChangeValues}
        placeholder='선택한 음악에 대한 아무 말이나 써보세요 ...'
      />

      <BattleAvailability>
        <span>대결 가능</span>
        <Toggle name='battleAvailability' disabled={false} onChange={onChangeValues} on={values.battleAvailability} />
      </BattleAvailability>
    </>
  );
}

export default Inputs;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
`;

const Description = styled.textarea`
  width: calc(100% - 1.9rem);
  min-height: 10rem;
  box-shadow: 0px 0px 10px rgba(226, 226, 226, 0.25);
  border-radius: 1rem;
  padding-top: 1.7rem;
  padding-left: 1.9rem;
  color: ${COLOR.deepBlue};
  font-weight: 500;
  font-size: 1.25rem;
  margin-bottom: 2.9rem;
  &::placeholder {
    color: ${COLOR.lightGray};
    font-weight: 400;
  }
`;

const BattleAvailability = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  font-weight: 700;
`;
