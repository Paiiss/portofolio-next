import type { Metadata } from 'next';

import HomeComponent from '@/components/Home/home';
import About from '@/components/Home/about';
import Skill from '@/components/Home/skill';
import Certificate from '@/components/Home/certificate';
import Project from '@/components/Home/project';

export default function Home() {
  return (
    <div>
      <HomeComponent />
      <About />
      <Skill />
      <Certificate />
      <Project />
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Portofolio',
  description:
    'Selamat datang di dunia kreatif saya! Saya Muhammad Fais Avriody Daffa, seorang mahasiswa yang memiliki minat programming.',
  authors: [
    { name: 'Muhammad Fais Avriody Daffa', url: 'https://allenstore.id' },
  ],
  category: 'Personal',
  openGraph: {
    title: 'Portofolio',
    description:
      'Selamat datang di dunia kreatif saya! Saya Muhammad Fais Avriody Daffa, seorang mahasiswa yang memiliki minat programming.',
    url: 'https://allenstore.id',
    type: 'website',
  },
};
