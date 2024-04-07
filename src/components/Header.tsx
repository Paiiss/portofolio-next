/* eslint-disable react/jsx-key */
import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import siteMetadata from '@/data/siteMetadata';
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
} from '@mui/material';

const Navbar = () => {
  const nav = [
    { name: 'About', route: '#about' },
    { name: 'Blog', route: '#blog' },
  ];
  return (
    <nav className="absolute top-0 left-0 z-10 w-full items-center bg-transparent">
      <div className="flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 h-16 max-w-7xl">
        <div>
          <Link href="/" className="text-lg font-bold">
            {siteMetadata.headerTitle}
          </Link>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
