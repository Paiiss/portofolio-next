import Button from '@mui/material/Button';

export default function about() {
  return (
    <section id="about" className="pt-36 pb-32">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full px-4 mb-10 md:w-1/2">
            <h4 className="font-bold uppercase text-pink-500 text-lg">
              Tentang saya
            </h4>
            <h3 className="font-bold text-lg lg:text-2xl">
              Minat dan keahlian
            </h3>
            <p>
              Saya memiliki minat mendalam dalam programming, dan saya memiliki
              pengalaman dalam membuat aplikasi web menggunakan Nuxtjs, Nestjs,
              dan Expressjs. Saat ini saya sedang belajar tentang Reactjs dan
              Nextjs menggunakan Tailwindcss.
            </p>
          </div>
          <div className="w-full px-4 md:w-1/2">
            <h3 className="font-bold text-lg lg:pt-7 lg:text-2xl">
              Pendidikan
            </h3>
            <p>
              Lulusan Madrasah Aliyah Negeri 1 Pekanbar pada tahun 2023, saya
              saat ini menempuh pendidikan di Universitas Hang Tuah Pekanbaru
              dengan jurusan Teknik Informatika.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
