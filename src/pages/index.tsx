import Battle from '@/components/common/ImageButtons/Battle';
import Like from '@/components/common/ImageButtons/like';
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
        <Like size={2} initCount={15} isClicked={false} onClick={() => console.log('click')} />
        <br />
        <Battle size={1.5} battleAbility={false} onClick={() => console.log('battle-click')} />
        <br />
        <Battle size={1.5} battleAbility={true} onClick={() => console.log('battle-click')} />
      </div>
    </>
  );
}
