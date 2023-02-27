import Header from '@/components/common/Header';
import BattleButton from '@/components/common/ImageButtons/BattleButton';
import LikeButton from '@/components/common/ImageButtons/LikeButton';
import TextDivider from '@/components/common/TextDivider';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href='/post/searchMusics' legacyBehavior>
        <a>create</a>
      </Link>
      {/*임시 */}
      <TextDivider text1='내가바로음잘알' text2='2023-02-21' />

      <div style={{ background: 'linear-gradient(130.7deg, #A274DC -10.45%, #658DF4 122.15%);' }}>
        <LikeButton size={2} initCount={15} isClicked={false} onClick={() => console.log('click')} />
        <br />
        <BattleButton size={1.5} battleAbility={false} onClick={() => console.log('battle-click')} />
        <br />
        <BattleButton size={1.5} battleAbility={true} onClick={() => console.log('battle-click')} />
      </div>

      <Header
        title='테스트용1'
        subButtonValue={'/images/search-icon.svg'}
        subButtonType='image'
        onClickSubButton={() => console.log('click!!')}
      />

      <Header
        shouldNeedBack={false}
        title='테스트용2'
        subButtonValue='complete'
        onClickSubButton={() => console.log('click!!')}
      />

      <Header shouldNeedBack={true} />
    </>
  );
}
