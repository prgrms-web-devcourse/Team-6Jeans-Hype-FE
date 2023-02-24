import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href='/post/searchMusics' legacyBehavior>
        <a>create</a>
      </Link>
    </>
  );
}
