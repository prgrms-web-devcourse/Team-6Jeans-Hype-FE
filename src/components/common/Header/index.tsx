import styled from '@emotion/styled';
import Link from 'next/link';
import BackIcon from 'public/images/arrow-left.svg';
import { FC, ReactNode } from 'react';

import { COLOR } from '@/constants/color';

interface Props {
  shouldNeedBack?: boolean;
  backUrl?: string;
  title?: string;
  actionButton?: ReactNode;
  color?: string;
}

const Header: FC<Props> = ({ shouldNeedBack = true, backUrl, title, actionButton, color = COLOR.deepBlue }) => {
  return (
    <Container>
      {shouldNeedBack && (
        <Link href={backUrl ?? ''}>
          <StyledBackIcon color={color} />
        </Link>
      )}
      {title && <H1>{title}</H1>}
      {actionButton}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: calc(100% - 4rem);
  height: 6rem;
  margin: 0 2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;
  position: relative;
`;

const H1 = styled.h1`
  position: absolute;
  font-size: 1.8rem;
  font-weight: bold;
  transform: translateX(-50%);
  left: 50%;
`;

const StyledBackIcon = styled(BackIcon)<{ color: string }>`
  & > path {
    stroke: ${({ color }) => color};
  }
`;
