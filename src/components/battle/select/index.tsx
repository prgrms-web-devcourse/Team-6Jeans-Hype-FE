import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Genres from '@/components/common/Genres';
import useVoteResult from '@/hooks/useVoteResult';

import VoteResult from '../voteResult';

const TEMP =
  'https://is5-ssl.mzstatic.com/image/thumb/Music122/v4/ca/20/55/ca205584-83ae-8be5-a415-03df7baae6cb/8809658318466_Cover.jpg/100x100bb.jpg';

const TEMP2 =
  'https://is3-ssl.mzstatic.com/image/thumb/Music112/v4/52/6e/b5/526eb565-8444-3ec2-0392-c3ed55feb0b9/cover_KM0015957_1.jpg/100x100bb.jpg';

function Select() {
  const { visible, onClickMusic } = useVoteResult();

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
            <BattleMusicInfo music={TEMP_OBJECT} onClick={onClickMusic} clickSide='left' />
            <BattleMusicInfo music={TEMP_OBJECT2} onClick={onClickMusic} clickSide='right' />
          </BattleContainer>
        </Section>
      </SelectContainer>
      {visible && <VoteResult battleId={1234} votedPostId={1234} clickSide='right' />}
    </>
  );
}

export default Select;

const SelectContainer = styled.div`
  width: calc(100% - 4rem);
  height: calc(100vh - 14rem);
  padding: 2rem;
  position: relative;
`;

const Section = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
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
