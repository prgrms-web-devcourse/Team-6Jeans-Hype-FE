import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

interface Props {
  size: number;
  color: 'white' | 'blue';
  battleAbility: boolean;
  onClick?(): void;
}

function Battle({ size, color, battleAbility, onClick }: Props) {
  return (
    <BattleContainer onClick={onClick}>
      <Image
        src={`/images/fire-icon-${battleAbility ? color : 'gray'}.svg`}
        alt='img'
        size={size}
        battleAbility={battleAbility}
      />
      <Text battleAbility={battleAbility} color={color}>
        {battleAbility ? '대결신청' : '대결불가'}
      </Text>
    </BattleContainer>
  );
}

export default Battle;

interface StyleProp {
  size?: number;
  color?: string;
  battleAbility: boolean;
}

const BattleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: ${({ size }: StyleProp) => `${size}rem;`};
  filter: ${({ battleAbility }: StyleProp) => (battleAbility ? `grayscale(0%)` : `grayscale(100%)`)};
`;

const Text = styled.div`
  text-align: center;
  color: ${({ battleAbility, color }: StyleProp) => {
    const targetColor = color === 'white' ? COLOR.white : COLOR.blue;

    return battleAbility ? targetColor : COLOR.gray;
  }};
  padding-top: 0.6rem;
`;
