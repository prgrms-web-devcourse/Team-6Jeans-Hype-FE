import { useRouter } from 'next/router';

interface Props {
  setIsPossibleBattle: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

function Battles({ setIsPossibleBattle }: Props) {
  const changeBattleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPossibleBattle(e.currentTarget.value === '대결 가능');
  };

  return (
    <>
      <div
        style={{
          width: '200px',
          height: '100px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={changeBattleStatus} value='대결 가능'>
          대결 가능
        </button>
        <button onClick={changeBattleStatus} value='대결 불가능'>
          대결 불가능
        </button>
      </div>
    </>
  );
}

export default Battles;
