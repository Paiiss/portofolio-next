'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function ProjectComponent() {
  const [showMore, setShowMore] = useState(false);

  const project = [
    {
      name: 'topupkuy.id',
      image: '/img/project-topupkuy.webp',
      description:
        'Topupkuy.id adalah platform yang menyediakan layanan top up untuk berbagai game online. Dengan fitur yang mudah digunakan, Topupkuy dirancang untuk memberikan kemudahan dalam melakukan top up game secara cepat dan aman.',
    },
    {
      name: 'Kuy Digital Landing Page',
      image: '/img/project-kuy.webp',
      description:
        'Kuy Digital Landing Page adalah halaman arahan yang dirancang untuk mempromosikan layanan Kuy Digital. Halaman ini menampilkan informasi tentang layanan yang ditawarkan, testimoni pengguna, dan ajakan untuk bergabung.',
    },
    {
      name: 'Kolam Renang Nabura',
      image: '/img/project-nabura.webp',
      description:
        'Kolam Renang Nabura adalah platform yang menyediakan informasi tentang kolam renang Nabura. Dengan fitur yang mudah digunakan, platform ini dirancang untuk memberikan kemudahan dalam mengakses informasi terkait kolam renang Nabura.',
    },
    {
      name: 'satudata.pekanbaru.go.id',
      image: '/img/project-3.png',
      description:
        'Satudata adalah platform yang menyediakan data-data terkait Kota Pekanbaru. Dengan fitur yang mudah digunakan, Satudata dirancang untuk memberikan kemudahan dalam mengakses data-data terkait Kota Pekanbaru.',
    },
    {
      name: 'Sapapemko Pekanbaru',
      image: '/img/project-sapapemko.webp',
      description:
        'Sapapemko Pekanbaru adalah aplikasi yang digunakan untuk memberikan broadcast kepada pegawai pemerintah kota Pekanbaru. Aplikasi ini juga memiliki fitur untuk mengucapkan selamat ulang tahun kepada pegawai, sehingga meningkatkan interaksi dan kebersamaan di lingkungan pemerintahan.',
    },
    {
      name: 'Wablaz',
      image: '/img/project-2.png',
      description:
        'Wablaz adalah platform pengriman pesan secara otomatis yang memungkinkan pengguna untuk mengirim pesan secara otomatis ke nomor WhatsApp tertentu. Dengan fitur yang mudah digunakan, Wablaz dirancang untuk memberikan kemudahan dalam mengirim pesan secara otomatis.',
    },
    {
      name: 'E-Commerce',
      image: '/img/project-1.png',
      description:
        'Proyek ini merupakan platform E-Commerce khusus untuk penjualan diamond dengan pendekatan otomatis. Melibatkan proses yang efisien dan aman, proyek ini dirancang untuk memberikan pengalaman berbelanja diamond yang tak tertandingi.',
    },
  ];

  const filteredProjects = showMore ? project : project.slice(0, 2);

  return (
    <section id="project" className="container w-full px-4 py-8 md:py-16">
      <h2
        className="pb-4 text-center text-2xl font-bold md:text-3xl"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        Project
      </h2>

      <div className="l grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredProjects.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg"
            data-aos="fade-up"
            data-aos-duration={3000}
            data-aos-delay={index * 100}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={500}
              height={300}
              className="h-auto w-full"
            />
            <div className="p-4">
              <h3 className="text-center text-lg font-bold text-black dark:text-white">
                {item.name}
              </h3>
              <p className="text-center text-black dark:text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center">
        <button className="mt-4 rounded underline" onClick={() => setShowMore(!showMore)}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </section>
  );
}
