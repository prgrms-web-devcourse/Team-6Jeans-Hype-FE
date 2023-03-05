import styled from '@emotion/styled';

import { Battle } from '@/components/battle/list/types';

import BattleCard from '../Card';

interface BattleListProps {
  battleList: Battle[];
}

export default function BattleList({ battleList }: BattleListProps) {
  return (
    <Container>
      {battleList?.map(({ challenged, challenging, id, isProgress }: Battle) => (
        <BattleCard {...{ challenged, challenging, id, isProgress }} key={id} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
