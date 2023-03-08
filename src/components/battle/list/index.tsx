import styled from '@emotion/styled';

import { Battle, FinishedBattleMusic } from '@/components/battle/list/types';

import BattleCard from '../Card';
import FinishedBattleCard from '../Card/Finished';
import { BattleStatusValue } from '../types';

interface BattleListProps {
  battleList: Battle<BattleStatusValue>[];
  className?: string;
}

export default function BattleList({ battleList, className }: BattleListProps) {
  return (
    <Container className={className}>
      {battleList?.map(({ challenged, challenging, id, battleStatus }: Battle<BattleStatusValue>) =>
        battleStatus === 'PROGRESS' ? (
          <BattleCard challenged={challenged} challenging={challenging} key={id} />
        ) : (
          <FinishedBattleCard
            challenged={challenged as FinishedBattleMusic}
            challenging={challenging as FinishedBattleMusic}
            key={id}
          />
        ),
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
