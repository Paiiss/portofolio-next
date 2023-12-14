import { Button, Typography } from '@mui/material';

export default function about() {
  return (
    <section id="about" className="pt-36 pb-32">
      <div className="container">
        <div className="flex flex-wrap">
          <div data-aos="fade-up-right" className="w-full px-4 mb-10 md:w-1/2">
            <h4 className="font-bold uppercase text-pink-500 text-lg">
              Tentang saya
            </h4>
            <h3 className="font-bold text-lg lg:text-2xl">
              Minat dan keahlian
            </h3>
            <p>
              Saya memiliki minat mendalam dalam programming, programming bagi
              saya bukan soal uang dan menjadi tujuan utama saya, melainkan
              programming adalah passion saya. saya memulai programming sejak di
              bangku SMA.
            </p>
          </div>
          <div data-aos="fade-up-left" className="w-full px-4 md:w-1/2">
            <h3 className="font-bold text-lg lg:pt-7 lg:text-2xl">
              Pendidikan
            </h3>
            <p>
              Saat ini saya sedang menempuh pendidikan di Universitas Hang Tuah
              Pekanbaru dengan jurusan Teknik Informatika angkatan 2023. Saya
              juga memiliki sertifikat dari Dicoding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
