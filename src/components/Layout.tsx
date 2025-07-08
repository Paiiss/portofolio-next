import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Header />
      <main className="mx-auto max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </Container>
  );
}
