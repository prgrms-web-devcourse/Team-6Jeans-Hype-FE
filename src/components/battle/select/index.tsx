import styled from '@emotion/styled';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Genres from '@/components/common/Genres';
import { COLOR } from '@/constants/color';
import useVoteResult from '@/hooks/useVoteResult';

import { useQuery } from '@tanstack/react-query';
import { getBattle } from '../api';
import VoteResult from '../voteResult';

function Select() {
  const { visible, position, onClickMusic } = useVoteResult();
  const { data: battleList, isLoading } = useQuery(['battleList'], getBattle);

  return isLoading || battleList === false ? (
    <>로딩중...</>
  ) : (
    <>
      <SelectContainer>
        <Genres onChange={() => console.log('click-genre')} />
        <Section>
          <Text>What’s your Hype Music?</Text>
          <BattleContainer>
            <BattleMusicInfo
              music={battleList?.challenged.music}
              onClick={(e) => onClickMusic(e, 'left')}
              clickSide='left'
            />
            <BattleMusicInfo
              music={battleList?.challenging.music}
              onClick={(e) => onClickMusic(e, 'right')}
              clickSide='right'
            />
          </BattleContainer>
        </Section>
        <Skip>건너뛰기</Skip>
      </SelectContainer>
      {visible && <VoteResult battleId={1234} votedPostId={1234} clickSide={position} />}
    </>
  );
}

export default Select;

const SelectContainer = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 16rem);
  padding: 0 2rem;
`;

const Section = styled.div`
  position: absolute;
  width: 33.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Skip = styled.div`
  position: absolute;
  width: 20rem;
  left: 50%;
  top: 75%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-weight: 700;
  font-size: 1.3rem;
  color: ${COLOR.blue};
  cursor: pointer;
`;

const Text = styled.div`
  font-size: 1.7rem;
  background: linear-gradient(98.38deg, #7d74dc -1.83%, #7697ec 86.44%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
  font-weight: 600;
  text-align: center;
`;

const BattleContainer = styled.div`
  width: 100%;
  max-width: 37.5rem;
  height: 36.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto;
`;
