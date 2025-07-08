import dynamic from 'next/dynamic';

const View = dynamic(() => import('./View'));

export const metadata = {
  title: 'FSA Slot Machine',
  description: 'A fun and interactive slot machine game built with Next.js and TypeScript.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-black">
      <div className="container mx-auto max-w-7xl flex-grow items-center justify-center">
        <View />
      </div>
    </div>
  );
}
