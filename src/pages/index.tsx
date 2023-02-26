import TextDivider from '@/components/common/TextDivider';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href='/post/searchMusics' legacyBehavior>
        <a>create</a>
      </Link>
      <TextDivider text1='내가바로음잘알' text2='2023-02-21' />
    </>
  );
}
