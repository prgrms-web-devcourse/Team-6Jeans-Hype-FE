import styled from '@emotion/styled';
import Logo from 'public/images/translucent-logo.svg';

import { COLOR } from '@/constants/color';

interface Props {
  text: string;
  width: number;
  isImage?: boolean;
}

function NoContent({ text, width, isImage }: Props) {
  return (
    <Container>
      {isImage && <StyledIcon width={width} alt='logo' />}
      <Text>{text}</Text>
    </Container>
  );
}

export default NoContent;

interface StyleProps {
  width: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledIcon = styled(Logo)<StyleProps>`
  width: ${({ width }) => `${width}rem`};
`;

const Text = styled.h1`
  color: ${COLOR.lightGray};
  font-size: 1.3rem;
  font-weight: 400;
`;
