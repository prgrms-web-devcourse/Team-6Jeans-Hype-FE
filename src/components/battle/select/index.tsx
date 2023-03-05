import styled from '@emotion/styled';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Genres from '@/components/common/Genres';
import AlbumPoster from '@/components/common/skeleton/AlbumPoster';
import { COLOR } from '@/constants/color';
import useVoteResult from '@/hooks/useVoteResult';

import VoteResult from '../voteResult';

interface Props {
  battleId?: number | undefined;
}

function Select({ battleId }: Props) {
  const { musicData, isLoadingState, selectedBattle, position, onClickGenre, onClickMusic, onClickSkip } =
    useVoteResult(battleId);

  return (
    <>
      <SelectContainer>
        <Genres onChange={onClickGenre} shouldNeedAll />
        <Section>
          <Text>What’s your Hype Music?</Text>
          <BattleContainer>
            {isLoadingState ? (
              <>
                <AlbumPoster />
                <AlbumPoster />
              </>
            ) : musicData == null ? (
              <div>대결할 음악이 없어요</div>
            ) : (
              <>
                <BattleMusicInfo
                  music={musicData?.challenged.music}
                  onClick={(e) => onClickMusic(e, 'left', musicData.battleId, musicData?.challenged.postId)}
                  clickSide='left'
                />
                <BattleMusicInfo
                  music={musicData?.challenging.music}
                  onClick={(e) => onClickMusic(e, 'right', musicData.battleId, musicData?.challenging.postId)}
                  clickSide='right'
                />
              </>
            )}
          </BattleContainer>
        </Section>
        {!battleId && <Skip onClick={onClickSkip}>건너뛰기</Skip>}
      </SelectContainer>

      {selectedBattle.battleId !== -1 && selectedBattle.votedPostId !== -1 && (
        <VoteResult battleId={selectedBattle.battleId} votedPostId={selectedBattle.votedPostId} clickSide={position} />
      )}
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
  background-clip: text;
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
