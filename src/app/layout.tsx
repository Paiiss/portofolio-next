import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';

// Component
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';

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
    <html lang={siteMetadata.language} className={`${quicksand.variable}`}>
      <body className="min-h-screen mx-auto flex flex-col bg-white dark:bg-gray-900">
        <Container>
          <Header />
          <main className="mx-auto pt-36 px-4 flex flex-col flex-1 max-w-6xl w-full">
            {children}
          </main>
          <Footer />
        </Container>
      </body>
    </html>
  );
}
