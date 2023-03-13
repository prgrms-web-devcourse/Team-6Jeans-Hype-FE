import styled from '@emotion/styled';
import CancelIcon from 'public/images/cancel-icon.svg';

import { COLOR } from '@/constants/color';

interface Props {
  onClose: () => void;
}

function Info({ onClose }: Props) {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.();
  };

  return (
    <Container onClick={onClick}>
      <Wrapper>
        <StyledCancelIconButton onClick={onClick}>
          <StyledCancelIcon />
        </StyledCancelIconButton>
        <Content>
          <div>Hype 서비스는 음악 추천(공유) 및 대결 서비스입니다.</div>
          <br />
          <div>
            Hype은 잘 알려지지 않은 숨은 명곡을 추천하고 대결을 통해 더 좋은 곡을 알아가는 서비스로, 대결 가능한 음악
            추천 게시글을 작성하고 대결을 진행할 수 있습니다.
          </div>
          <br />
          <div>
            <small>대결권은 최초 가입시 5개가 기본 제공되며, 대결 가능한 추천 글 작성 시 1개가 추가됩니다.</small>
          </div>
          <br />
          <div>
            <Strong>🎵 나만 아는 명곡 추천</Strong>
            추천 탭에서 나만 아는 명곡을 검색하고 추천 글을 작성할 수 있습니다.
          </div>
          <br />
          <div>
            <Strong>🎧 다른 사용자의 추천 음악 듣기</Strong>
            피드 탭에서 추천한 음악 리스트를 보고 들을 수 있습니다.
          </div>
          <br />
          <div>
            <Strong>🆚 같은 장르 속 다른 추천 음악과 대결</Strong>
            피드 탭에서 추천 글에 대결 신청이 가능하며, 대결 탭에서 1:1 대결에 투표할 수 있습니다.
          </div>
          <br />
          <div>
            <Strong>💎 대결 결과와 유저 랭킹 확인</Strong>
            매일 자정 대결 종료 후 승리 포인트를 얻을 수 있습니다. 메인 탭에서 지난 일주일 간의 포인트를 기준으로
            산정되는 사용자 랭킹을 확인할 수 있습니다.
          </div>
          <br />
          <div>
            <Strong>😎 음잘알들의 추천 음악 듣기</Strong>
            메인 탭에서 상위 랭킹 사용자의 추천 음악을 확인할 수 있습니다.
          </div>
        </Content>
      </Wrapper>
    </Container>
  );
}

export default Info;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(0.13rem);
`;

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(80% - 4rem);
  max-width: 60rem;
  max-height: 60rem;
  height: 80%;
  background-color: ${COLOR.white};
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  overflow-y: scroll;
  font-size: 1.3rem;
`;

const StyledCancelIconButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.1s ease;
  }
`;

const StyledCancelIcon = styled(CancelIcon)`
  width: 1rem;
  height: 1rem;
`;

const Content = styled.div`
  line-height: 150%;
  font-size: 1.4rem;
  & > div:first-of-type {
    font-size: 1.6rem;
    font-weight: 700;
  }
`;

const Strong = styled.strong`
  display: block;
  font-size: 1.5rem;
  line-height: 170%;
`;
