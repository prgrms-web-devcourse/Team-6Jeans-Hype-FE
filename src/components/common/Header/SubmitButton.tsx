import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

interface HeaderSubmitButtonProps {
  onClick: () => void;
  className?: string;
}

export default function HeaderSubmitButton(props: HeaderSubmitButtonProps) {
  return <Button {...props}>완료</Button>;
}

const Button = styled.button`
  font-weight: 500;
  font-size: 1.4rem;
  color: ${COLOR.deepBlue};

  &:active {
    font-weight: 700;
  }
`;
