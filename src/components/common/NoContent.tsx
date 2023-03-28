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

const StyledIcon = styled(Logo)<{ width: number }>`
  width: ${({ width }) => `${width}rem`};
`;

const Text = styled.h1`
  color: ${COLOR.lightGray};
  font-size: 1.3rem;
  font-weight: 400;
  text-align: center;
  padding: 1rem 0 2rem;
`;
