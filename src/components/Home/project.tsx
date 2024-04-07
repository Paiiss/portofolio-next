import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

export default function ProjectComponent() {
  const project = [
    {
      name: 'E-Commerce',
      image: '/image/project-1.png',
      description:
        'Proyek ini merupakan platform E-Commerce khusus untuk penjualan diamond dengan pendekatan otomatis. Melibatkan proses yang efisien dan aman, proyek ini dirancang untuk memberikan pengalaman berbelanja diamond yang tak tertandingi.',
    },
    {
      name: 'Wablaz',
      image: '/image/project-2.png',
      description:
        'Wablaz adalah platform pengriman pesan secara otomatis yang memungkinkan pengguna untuk mengirim pesan secara otomatis ke nomor WhatsApp tertentu. Dengan fitur yang mudah digunakan, Wablaz dirancang untuk memberikan kemudahan dalam mengirim pesan secara otomatis.',
    },
    {
      name: 'satudata.pekanbaru.go.id',
      image: '/image/project-3.png',
      description:
        'Satudata adalah platform yang menyediakan data-data terkait Kota Pekanbaru. Dengan fitur yang mudah digunakan, Satudata dirancang untuk memberikan kemudahan dalam mengakses data-data terkait Kota Pekanbaru.',
    },
  ];
  return (
    <section id="project">
      <div className="container">
        <div className="w-full px-4">
          <div className="w-full" data-aos="fade-up">
            <h2 className="font-bold pb-4 text-2xl md:text-3xl text-center">
              Project
            </h2>
            <Grid
              container
              rowSpacing={1}
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {/* <Grid item md={6} xs={12}>
                <Card elevation={0} style={{ backgroundColor: 'transparent' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/image/project-1.png"
                    alt="project allenstore"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="dark:text-white text-black text-center"
                    >
                      E-Commerce
                    </Typography>
                    <Typography
                      variant="body2"
                      className="dark:text-white text-black"
                    >
                      Proyek ini merupakan platform E-Commerce khusus untuk
                      penjualan diamond dengan pendekatan otomatis. Melibatkan
                      proses yang efisien dan aman, proyek ini dirancang untuk
                      memberikan pengalaman berbelanja diamond yang tak
                      tertandingi.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid> */}
              {project.map((item, index) => (
                <Grid item md={6} xs={12} key={index}>
                  <Card
                    elevation={0}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent>
                      {/* <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className="dark:text-white text-black text-center"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="dark:text-white text-black"
                      >
                        {item.description}
                      </Typography> */}
                      <div>
                        <h3 className="font-bold text-lg text-center text-black dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-center text-black dark:text-white">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
}
