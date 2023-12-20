import type { Metadata } from 'next';
import Script from 'next/script';
import { Quicksand } from 'next/font/google';
import './globals.css';
import '../../styles/CustomScrollbar.scss';

// Component
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import AOS from '@/components/aos';

// Data
import siteMetadata from '@/data/siteMetadata';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.headerTitle,
    template: '%s | ' + siteMetadata.headerTitle,
  },
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteMetadata.language} className={`${quicksand.variable} `}>
      <AOS />
      <body className="flex flex-col min-h-screen bg-white dark:bg-gray-900 ">
        <Container>
          <Header />
          <main className="mx-auto pt-36 px-4 flex flex-col overflow-hidden">
            {children}
          </main>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
