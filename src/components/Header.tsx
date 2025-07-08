/* eslint-disable react/jsx-key */
import ThemeSwitcher from '@/components/ThemeSwitcher';
import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';

const Navbar = () => {
  const nav = [
    { name: 'About', route: '#about' },
    { name: 'Blog', route: '#blog' },
  ];
  return (
    <nav className="absolute left-0 top-0 z-10 w-full items-center border-b border-gray-200 bg-transparent dark:border-gray-700">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-mono text-2xl font-bold md:text-3xl">
          {siteMetadata.headerTitle}
        </Link>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
