import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  message: string;
  duration?: number;
  bottom?: string;
}

export default function Toast({ message, duration = 700, bottom = '5rem' }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const handleSetTimeout = setTimeout(() => {
      setVisible(false);
      clearTimeout(handleSetTimeout);
    }, duration);
  }, [duration]);

  return (
    <Container visible={visible} bottom={bottom}>
      <Text>{message}</Text>
    </Container>
  );
}

const Container = styled.div<{ visible: boolean; bottom: string }>`
  background-color: ${COLOR.blue};
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  color: ${COLOR.white};
  position: fixed;
  left: 50%;
  bottom: ${({ bottom }) => bottom};
  transform: translate(-50%, -50%);
  opacity: ${({ visible }) => (visible ? 0.95 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Text = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
`;
