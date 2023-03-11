import styled from '@emotion/styled';

import Base from './Base';

const SkeletonCircle = styled(Base)<{ width?: number; height?: number }>`
  width: ${({ width }) => `${width}rem`};
  height: ${({ height }) => `${height}rem`};
  border-radius: 50%;
`;

export default SkeletonCircle;
