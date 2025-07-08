import type { Metadata } from 'next';

import About from '@/components/Home/about';
import Certificate from '@/components/Home/certificate';
import HomeComponent from '@/components/Home/home';
import Project from '@/components/Home/project';
import Skill from '@/components/Home/skill';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white pt-24 dark:bg-gray-900 md:pt-16">
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
  authors: [{ name: 'Muhammad Fais Avriody Daffa', url: 'https://peix.my.id' }],
  category: 'Personal',
  openGraph: {
    title: 'Portofolio',
    description:
      'Selamat datang di dunia kreatif saya! Saya Muhammad Fais Avriody Daffa, seorang mahasiswa yang memiliki minat programming.',
    url: 'https://peix.my.id',
    type: 'website',
  },
};
