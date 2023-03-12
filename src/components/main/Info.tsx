import styled from '@emotion/styled';

import { COLOR } from '@/constants/color';

interface Props {
  onClick: () => void;
}
const TEXT = `
Hype 서비스는 음악 추천(공유) 및 대결 서비스입니다.

    먼저 추천 게시글 등록 페이지에서
      - 원하는 음악을 검색합니다 (가수 제목 형태) 
      - 밑에 뜨는 리스트에서 선택 후 장르와 대결 가능 유무를 선택하여 숨어 듣는 명곡들을 추천 및 공유할 수 있습니다
    
    그럼 게시글이 등록되고 대결을 할 수 있게 됩니다.
    대결은 자신이 등록한 음악 추천(공유) 게시글로 이루어집니다.
    추천 피드에 대결신청이 붙어있는 게시글이 대결 가능 유무를 가능으로 등록한 대결이고 대결 신청 버튼을 통해 대결 신청할 수 있습니다.
    
    대결 신청페이지의 내 대결 곡 고르기를 누르면 대결 상대 음악과 같은 장르의 내가 추천(공유)한 게시글이 보여집니다. 그 중 하나를 선택 후 대결신청을 완료합니다.
    
    신청한 대결들은 숏츠 및 피드에서 확인할 수 있고 투표할 수 있습니다
    
    이 투표수를 이용해서 매일 자정에 대결이 종료되고 각 음악에 대한 투표수 차이를 승자가 포인트로 받습니다
    
    이렇게 얻은 포인트는 마이페이지에서 확인할 수 있고 이를 토대로 랭킹이 측정됩니다. 그리고 대결을 신청하기 위해선 대결권이 필요하고 기본으로 5개의 대결권이 제공되고 대결가능한 게시글을 등록할 때마다 1개의 대결권을 얻을 수 있습니다. 이뿐만 아니라 마이페이지에서는 내가 참여한 대결 및 등록한 게시글을 살펴볼 수 있습니다.
    
    마지막으로 메인페이지에서는 측정된 랭킹을 보여주는 페이지가 존재합니다. 자신의 랭킹을 확인할 수 있고 다른 유저의 프로필을 눌러서 해당 유저가 참여한 대결과 추천(공유)한 게시글을 확인하여 음잘알들은 어떤 노래를 듣는지 공유 받을 수 있습니다.
`;
function Info({ onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <Wrapper>
        {TEXT.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
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
  backdrop-filter: blur(5px);
`;

const Wrapper = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(50% - 4rem);
  height: 50%;
  background-color: ${COLOR.white};
  border-radius: 1rem;
  padding: 1rem 2rem;
  box-shadow: 0px 0px 15px rgba(158, 158, 158, 0.25);
  overflow-y: scroll;
`;
