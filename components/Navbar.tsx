import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4">
        <Link href="/" className="mr-4">
          Home
        </Link>
        <Link href="/search" className="mr-4">
          Search
        </Link>
      </nav>
    </div>
  );
};
