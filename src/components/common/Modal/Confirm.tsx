import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

import ModalWrapper from './Wrapper';

interface ConfirmModalProps {
  onClickConfirm: () => void;
  onClickCancel: () => void;
  text: string;
  isOpened: boolean;
}

export default function ConfirmModal({ isOpened, text, onClickCancel, onClickConfirm }: ConfirmModalProps) {
  return (
    <ModalWrapper isOpened={isOpened}>
      <Container>
        <Text>{text}</Text>
        <ButtonWrapper>
          <button onClick={onClickConfirm}>예</button>
          <button onClick={onClickCancel}>아니오</button>
        </ButtonWrapper>
      </Container>
    </ModalWrapper>
  );
}

const Container = styled.div`
  background-color: ${COLOR.white};
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 2.6rem;
  display: flex;
  flex-direction: column;
  padding: 2.7rem 2.3rem;
  width: max-content;
  align-items: center;
  gap: 1.8rem;
`;

const Text = styled.div`
  grid-column: 1 / span 2;
  color: ${COLOR.deepBlue};
  text-align: center;
  white-space: pre-line;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  & > button {
    border-radius: 1.5rem;
    background-color: ${COLOR.blue};
    color: ${COLOR.white};
    width: 7rem;
    padding: 0.5rem 0;
  }
`;
