import styled from '@emotion/styled';

import { Battle } from '@/components/battle/list/types';

import BattleCard from '../Card';

interface BattleListProps {
  battleList: Battle[];
  className?: string;
}

export default function BattleList({ battleList, className }: BattleListProps) {
  return (
    <Container className={className}>
      {battleList?.map(({ challenged, challenging, id, isProgress }: Battle) => (
        <BattleCard {...{ challenged, challenging, isProgress }} key={id} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
