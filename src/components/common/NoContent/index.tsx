import styled from '@emotion/styled';
import Logo from 'public/images/translucent-logo.svg';

import { COLOR } from '@/constants/color';

interface Props {
  text: string;
  width?: number;
  isImage?: boolean;
}

function NoContent({ text, width, isImage }: Props) {
  return (
    <>
      {isImage && <StyledIcon width={width} alt='logo' />}
      <Text>{text}</Text>
    </>
  );
}

export default NoContent;

interface StyleProps {
  width: number;
}

const StyledIcon = styled(Logo)<StyleProps>`
  width: ${({ width }) => `${width}rem`};
`;

const Text = styled.h1`
  color: ${COLOR.lightGray};
  font-size: 1.3rem;
  font-weight: 400;
  padding: 1rem 0 2rem;
  text-align: center;
`;
