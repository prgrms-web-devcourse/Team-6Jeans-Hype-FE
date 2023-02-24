import styled from '@emotion/styled';

import Base from './Base';

interface Size {
  width?: string | number;
  height?: string | number;
}

const SkeletonBase = styled(Base)`
  width: ${({ width }: Size) => (typeof width === 'number' ? `${width}px` : width)};
  height: ${({ height }: Size) => (typeof height === 'number' ? `${height}px` : height)};
`;

export default SkeletonBase;
