import styled from '@emotion/styled';

interface HeaderSubmitButtonProps {
  onClick: () => void;
  className?: string;
}

export default function HeaderSubmitButton(props: HeaderSubmitButtonProps) {
  return <Button {...props}>완료</Button>;
}

const Button = styled.button`
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.2rem;
`;
