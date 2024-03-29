import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

import { ModalProps } from './types';
import ModalWrapper from './Wrapper';

interface ConfirmModalProps extends ModalProps {
  onClickConfirm: () => void;
  onClickCancel: () => void;
}

export default function ConfirmModal({ isOpen, text, onClickCancel, onClickConfirm }: ConfirmModalProps) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <Container>
        <Text>{text}</Text>
        <ButtonWrapper>
          <Button onClick={onClickConfirm}>예</Button>
          <Button onClick={onClickCancel}>아니오</Button>
        </ButtonWrapper>
      </Container>
    </ModalWrapper>
  );
}

const Container = styled.div`
  background-color: ${COLOR.white};
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.08);
  border-radius: 2rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  max-width: 25rem;
  width: 50%;
  align-items: center;
  gap: 2rem;
`;

const Text = styled.div`
  color: ${COLOR.deepBlue};
  text-align: center;
  white-space: pre-line;
  font-size: 1.4rem;
  line-height: 2rem;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const Button = styled.button`
  border-radius: 1.5rem;
  background-color: ${COLOR.lightGray};
  color: ${COLOR.white};
  width: 7rem;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.blue};
    transition: 0.2s ease;
  }

  &:active {
    background-color: #5a7cd4;
  }
`;
