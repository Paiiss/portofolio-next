import HomeComponent from '@/components/Home/home';
import About from '@/components/Home/about';
import Skill from '@/components/Home/skill';
import Certificate from '@/components/Home/certificate';

export default function Home() {
  return (
    <div>
      <HomeComponent />
      <About />
      <Skill />
      <Certificate />
    </div>
  );
}
