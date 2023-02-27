import { useRouter } from 'next/router';

function Battles() {
  const router = useRouter();

  const changeBattleStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value === '대결 가능') router.push(`/post?battle=true`);
    else router.push(`/post?battle=false`);
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
