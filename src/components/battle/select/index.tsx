import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Genres from '@/components/common/Genres';
import { COLOR } from '@/constants/color';
import useVoteResult from '@/hooks/useVoteResult';

import VoteResult from '../voteResult';

const TEMP =
  'https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ca/20/55/ca205584-83ae-8be5-a415-03df7baae6cb/8809658318466_Cover.jpg/100x100bb.jpg';

const TEMP2 =
  'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg';

function Select() {
  const { visible, position, onClickMusic } = useVoteResult();

  const TEMP_OBJECT = {
    musicName: '신경 쓸 게 많아서 (Feat. The Quiett)',
    musicUrl: 'test',
    thumbnailUrl: TEMP,
    singer: 'Gist',
  };

  const TEMP_OBJECT2 = {
    musicName: '떠나 (Prod. PATEKO (파테코))',
    musicUrl: 'test',
    thumbnailUrl: TEMP2,
    singer: 'THAMA, Jayci yucca (제이씨 유카)',
  };

  return (
    <>
      <SelectContainer>
        <Genres onChange={() => console.log('click-genre')} />
        <Section>
          <Text>What’s your Hype Music?</Text>
          <BattleContainer>
            <BattleMusicInfo music={TEMP_OBJECT} onClick={(e) => onClickMusic(e, 'left')} clickSide='left' />
            <BattleMusicInfo music={TEMP_OBJECT2} onClick={(e) => onClickMusic(e, 'right')} clickSide='right' />
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
