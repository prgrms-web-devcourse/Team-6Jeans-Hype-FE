import styled from '@emotion/styled';

import BattleMusicInfo from '@/components/common/BattleMusicInfo';
import Genres from '@/components/common/Genres';
import AlbumPoster from '@/components/common/skeleton/AlbumPosterSkeleton';
import { COLOR } from '@/constants/color';

import { Battles, SelectedBattle } from '../types';

interface Props {
  battleId?: number | undefined;
  musicData: Battles | undefined;
  isLoadingState: boolean;
  onClickMusic: (
    e: React.ChangeEvent<HTMLElement>,
    clickSide: 'left' | 'right',
    battleId: number,
    votedPostId: number,
  ) => void;
  onClickSkip: () => void;
}

function Select({ battleId, musicData, isLoadingState, onClickMusic, onClickSkip }: Props) {
  return (
    <>
      <Section>
        {musicData == null ? (
          <Empty>대결할 음악이 없어요</Empty>
        ) : (
          <>
            <Text>What’s your Hype Music?</Text>
            <BattleContainer>
              {isLoadingState ? (
                <>
                  <AlbumPoster />
                  <AlbumPoster />
                </>
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
            {!battleId && <Skip onClick={onClickSkip}>건너뛰기</Skip>}
          </>
        )}
      </Section>
    </>
  );
}

export default Select;

const Section = styled.div`
  position: relative;
  width: 33.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Skip = styled.div`
  position: absolute;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
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

const Empty = styled.div`
  text-align: center;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  color: ${COLOR.gray};
`;
