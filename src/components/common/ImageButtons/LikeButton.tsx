import { COLOR } from '@/constants/color';
import useLike from '@/hooks/useLike';
import styled from '@emotion/styled';

interface Props {
  size: number;
  initCount: number;
  isClicked: boolean;
  onClick?(): void;
}

function Like({ size, initCount, isClicked, onClick }: Props) {
  const { state, onClickLike } = useLike({ initCount, isClicked });

  const handleClick = () => {
    onClickLike();
    onClick?.();
  };

  return (
    <LikeContainer onClick={handleClick} size={size}>
      <img src={`/images/like-icon-${state.isClicked ? 'on' : 'off'}.svg`} alt='img' />
      <div>{state.count}</div>
    </LikeContainer>
  );
}

export default Like;

interface StyleProp {
  size: number;
}

const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    width: ${({ size }: StyleProp) => `${size}rem;`};
  }

  & > div {
    text-align: center;
    color: ${COLOR.white};
    font-size: 1rem;
    padding-top: 0.3rem;
  }
`;
