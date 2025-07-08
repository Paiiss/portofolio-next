import Image from 'next/image';

export default function CertificateComponent() {
  const certificateImages = ['/img/certificate-1.png', '/img/certificate-2.png'];
  return (
    <section id="certificate" className="container py-8 md:py-16">
      <h2
        className="pb-4 text-center text-2xl font-bold dark:text-white md:text-3xl"
        data-aos="fade-up"
        data-aos-duration={3000}
      >
        Certificate
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {certificateImages.map((image, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg shadow-lg"
            data-aos="fade-up"
            data-aos-duration={3000}
            data-aos-delay={index * 300}
          >
            <Image
              src={image}
              alt={`Certificate ${index + 1}`}
              width={500}
              height={300}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
