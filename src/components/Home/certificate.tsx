import { Grid, Card, CardMedia } from '@mui/material';
import Link from 'next/link';

export default function CertificateComponent() {
  const certificateImages = [
    '/image/certificate-1.png',
    '/image/certificate-2.png',
  ];
  return (
    <section id="certificate">
      <div className="container pb-32">
        <div className="w-full text-center" data-aos="fade-up">
          <h2 className="pb-4 text-2xl font-bold dark:text-white md:text-3xl">
            Certificate
          </h2>
          <Grid
            container
            rowSpacing={1}
            justifyContent="center"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {certificateImages.map((image, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  elevation={3}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                >
                  <CardMedia
                    style={{ borderRadius: '8px' }}
                    component="img"
                    alt="Certificate "
                    height="140"
                    image={image}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </section>
  );
}
