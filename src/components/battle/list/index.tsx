import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { Battle, FinishedBattleMusic } from '@/components/battle/list/types';

import BattleCard from '../Card';
import FinishedBattleCard from '../Card/Finished';
import { BattleStatusValue } from '../types';

interface BattleListProps {
  battleList: Battle<BattleStatusValue>[];
  className?: string;
}

export default function BattleList({ battleList, className }: BattleListProps) {
  const router = useRouter();

  const navigateDetail = (battleId: number) => {
    router.push(`/battle/detail?id=${battleId}`);
  };

  return (
    <Container className={className}>
      {battleList?.map(({ challenged, challenging, id, battleStatus }: Battle<BattleStatusValue>) =>
        battleStatus === 'PROGRESS' ? (
          <BattleCard onClick={() => navigateDetail(id)} challenged={challenged} challenging={challenging} key={id} />
        ) : (
          <FinishedBattleCard
            onClick={() => navigateDetail(id)}
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
