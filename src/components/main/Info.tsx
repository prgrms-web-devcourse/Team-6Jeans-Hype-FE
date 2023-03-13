import styled from '@emotion/styled';
import CancelIcon from 'public/images/cancel-icon.svg';

import { COLOR } from '@/constants/color';

import { TEXT } from './const';

interface Props {
  onClose: () => void;
}

function Info({ onClose }: Props) {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <Container onClick={onClick}>
      <Wrapper>
        <StyledCancelIconButton onClick={onClick}>
          <StyledCancelIcon />
        </StyledCancelIconButton>
        {TEXT.split('\n').map((line, i) => (
          <div key={i}>
            {line}
            <br />
          </div>
        ))}
      </Wrapper>
    </Container>
  );
}

export default Info;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(0.13rem);
`;

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(80% - 4rem);
  max-width: 60rem;
  max-height: 60rem;
  height: 80%;
  background-color: ${COLOR.white};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  overflow-y: scroll;
  font-size: 1.3rem;

  & > div:first-of-type {
    font-weight: 700;
    font-size: 1.5rem;
  }
`;

const StyledCancelIconButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.1s ease;
  }
`;

const StyledCancelIcon = styled(CancelIcon)`
  width: 1rem;
  height: 1rem;
`;
