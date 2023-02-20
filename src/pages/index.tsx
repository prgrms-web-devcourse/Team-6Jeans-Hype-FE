import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link href='/post/create' legacyBehavior>
        <a>create</a>
      </Link>
    </>
  );
}
