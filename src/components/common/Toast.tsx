import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  message: string;
  duration?: number;
}

export default function Toast({ message, duration = 1200 }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const handleSetTimeout = setTimeout(() => {
      setVisible(false);
      clearTimeout(handleSetTimeout);
    }, duration);
  }, [duration]);

  return (
    <Container visible={visible}>
      <Text>{message}</Text>
    </Container>
  );
}

const Container = styled.div<{ visible: boolean }>`
  background-color: ${COLOR.deepBlue};
  padding: 1rem 2rem;
  border-radius: 2rem;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  color: ${COLOR.white};
  position: fixed;
  left: 50%;
  bottom: 5rem;
  transform: translate(-50%, -50%);
  opacity: ${({ visible }) => (visible ? 0.95 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Text = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
`;
