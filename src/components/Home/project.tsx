import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

export default function ProjectComponent() {
  return (
    <section id="project">
      <div className="container">
        <div className="w-full px-4">
          <div className="w-full ">
            <h2 className="font-bold pb-4 text-2xl md:text-3xl text-center">
              Project
            </h2>
            <Grid
              container
              rowSpacing={1}
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={6} xs={12}>
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
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </section>
  );
}
