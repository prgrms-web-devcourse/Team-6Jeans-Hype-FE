import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';
import useLike from '@/hooks/useLike';

interface Props {
  size: number;
  color: 'white' | 'purple';
  initCount: number;
  isClicked: boolean;
  onClick?(): void;
}

function Like({ size, initCount, color, isClicked, onClick }: Props) {
  const { state, onClickLike } = useLike({ initCount, isClicked });

  const handleClick = () => {
    onClickLike();
    onClick?.();
  };

  return (
    <LikeContainer onClick={handleClick}>
      <Image size={size} src={`/images/like-icon-${state.isClicked ? 'on' : 'off'}-${color}.svg`} alt='img' />
      <Text color={color}>{state.count}</Text>
    </LikeContainer>
  );
}

export default Like;

interface StyleProp {
  size?: number;
  color?: 'white' | 'purple';
}

const LikeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: ${({ size }: StyleProp) => `${size}rem;`};
`;
const Text = styled.div`
  text-align: center;
  color: ${({ color }: StyleProp) => (color === 'white' ? COLOR.white : COLOR.purple)};
  font-size: 1rem;
  padding-top: 0.3rem;
  text-align: center;
`;
