import React from 'react';
import { FaNodeJs } from 'react-icons/fa6';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  CardActions,
  CardMedia,
} from '@mui/material';
import Image from 'next/image';
import JavascriptLogo from '../../../public/image/javascript.png';

export default function SkillComponent() {
  const data = [
    { id: 1, title: 'Nodejs', image: '/image/nodejs.png' },
    { id: 2, title: 'Javascript', image: '/image/javascript.png' },
    { id: 3, title: 'Typescript', image: '/image/typescript.png' },
    { id: 4, title: 'Express', image: '/image/express.png' },
    { id: 5, title: 'Nestjs', image: '/image/nestjs.png' },
    { id: 6, title: 'Monggodb', image: '/image/monggodb.png' },
    { id: 7, title: 'Nuxtjs', image: '/image/nuxt.png' },
    { id: 8, title: 'vuejs', image: '/image/vuejs.png' },
    { id: 9, title: 'vuetify', image: '/image/vuetify.png' },
    { id: 10, title: 'Mysql', image: '/image/mysql.png' },
    { id: 11, title: 'Rest api', image: '/image/restapi.png' },
  ];
  return (
    <section id="skill" className="">
      <div className="container pb-32">
        <div className="w-full px-4">
          <div className="mx-auto max-w-xl text-center">
            <h2
              data-aos="fade-up"
              className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-2xl md:text-3xl"
            >
              Skill
            </h2>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {data.map((item) => (
                <Grid item xs={3} md={2} key={item.id}>
                  <Card
                    data-aos="fade-up"
                    data-aos-duration="3000"
                    elevation={0}
                    style={{
                      backgroundColor: 'transparent',
                    }}
                  >
                    <CardMedia
                      style={{ borderRadius: '8px' }}
                      component="img"
                      alt={item.title}
                      height="140"
                      image={item.image}
                    />
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
