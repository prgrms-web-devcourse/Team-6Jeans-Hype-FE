import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const Header: FC<Props> = ({
  shouldNeedBack = true,
  backUrl,
  title,
  actionButton: ActionButton,
  color = COLOR.deepBlue,
}) => {
  const router = useRouter();

  const BackButton = backUrl ? (
    <Link href={backUrl}>
      <StyledBackIcon color={color} />
    </Link>
  ) : (
    <StyledBackIcon onClick={() => router.back()} color={color} />
  );

  return (
    <Container>
      {shouldNeedBack && BackButton}
      {title && <H1 color={color}>{title}</H1>}
      {ActionButton}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: calc(100% - 4rem);
  height: 6rem;
  margin: 0 1rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  align-items: center;
  position: relative;
`;

const H1 = styled.h1<{ color: string }>`
  position: absolute;
  font-size: 1.8rem;
  font-weight: 700;
  transform: translateX(-50%);
  left: 50%;
  color: ${({ color }) => color};
`;

const StyledBackIcon = styled(BackIcon)<{ color: string }>`
  & > path {
    stroke: ${({ color }) => color};
  }
`;
