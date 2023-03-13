import styled from '@emotion/styled';
import { ReactNode, useEffect, useState } from 'react';

interface ModalWrapperProps {
  children: ReactNode;
  isOpened: boolean;
}

export default function ModalWrapper({ children, isOpened }: ModalWrapperProps) {
  const [isAnimation, setIsAnimation] = useState(true);

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimation(false), 300);
    } else {
      document.body.style.overflow = 'initial';
      setIsAnimation(true);
    }
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, [isOpened]);

  return (
    <Container isOpened={isOpened} isAnimation={isAnimation}>
      {children}
    </Container>
  );
}

const Container = styled.div<{ isOpened: boolean; isAnimation: boolean }>`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isOpened ? 'block' : 'none')};
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);

  & > *:first-of-type {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: ${(props) => (props.isAnimation ? 'all 0.3s' : 'initial')};
  }
`;
