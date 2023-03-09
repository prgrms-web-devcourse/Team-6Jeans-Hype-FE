import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import AlbumPoster from '@/components/common/skeleton/AlbumPosterSkeleton';
import { COLOR } from '@/constants/color';

import Moving from '../detail/BattleMusic/Moving';
import { Battles } from '../types';

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

function TestCompo({ musicData, isLoadingState, onClickSkip }: Props) {
  const router = useRouter();
  const { id } = router.query;

  const onClickBattleMusic = (clickSide: 'left' | 'right', musicId: number | undefined) => {
    console.log(`선택한 포스트의 ID와 해당 배틀의 ID 저장 필요: ${musicData?.battleId} / ${musicId}`);
    console.log(`누른 포지션(left | right 저장 필요: ${clickSide}`);
    if (id === undefined) {
      setTimeout(() => {
        console.log('1.7초 후 refetch하기');
      }, 1700);
    }
  };

  if (musicData == null) {
    return (
      <Section>
        <Empty>대결할 음악이 없어요</Empty>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <Text>What’s your Hype Music?</Text>
        <BattleContainer>
          {isLoadingState ? (
            <>
              <AlbumPoster />
              <AlbumPoster />
            </>
          ) : (
            <>
              <Moving music={musicData.challenged.music} moving='left' onClick={onClickBattleMusic} />
              <Moving music={musicData.challenging.music} moving='right' onClick={onClickBattleMusic} />
            </>
          )}
        </BattleContainer>
        {!id && <Skip onClick={onClickSkip}>건너뛰기</Skip>}
      </Section>
    </>
  );
}

export default TestCompo;

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
