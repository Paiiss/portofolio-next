import type { Metadata } from 'next';
import { Quicksand, VT323 } from 'next/font/google';
import '../../styles/CustomScrollbar.scss';
import './globals.css';

// Component

import AOS from '@/components/aos';

// Data
import siteMetadata from '@/data/siteMetadata';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.headerTitle,
    template: '%s | ' + siteMetadata.headerTitle,
  },
  description: siteMetadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} className={`${quicksand.variable} ${vt323.variable}`}>
      <AOS />
      <body className="flex min-h-screen flex-col bg-white dark:bg-gray-900">{children}</body>
    </html>
  );
}
