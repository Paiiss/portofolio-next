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
    {
      id: 1,
      title: 'JavaScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      id: 2,
      title: 'TypeScript',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      id: 3,
      title: 'React',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      id: 4,
      title: 'HTML5',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
    {
      id: 5,
      title: 'CSS3',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    },
    {
      id: 6,
      title: 'Go',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    },
    {
      id: 7,
      title: 'NestJS',
      image: 'https://cdn.simpleicons.org/nestjs/E0234E',
    },
    {
      id: 8,
      title: 'Discord.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg',
    },
    {
      id: 9,
      title: 'MongoDB',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      id: 10,
      title: 'Apache',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg',
    },
    {
      id: 11,
      title: 'Git',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    {
      id: 12,
      title: 'GitHub',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    },
    {
      id: 13,
      title: 'Heroku',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg',
    },
    {
      id: 14,
      title: 'MySQL',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
    {
      id: 15,
      title: 'Linux',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
    },
    {
      id: 16,
      title: 'Figma',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    },
    {
      id: 17,
      title: 'Node.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      id: 18,
      title: 'NGINX',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
    },
    {
      id: 19,
      title: 'npm',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
    },
    {
      id: 20,
      title: 'C++',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    },
    {
      id: 21,
      title: 'Vue.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    },
    {
      id: 22,
      title: 'Nuxt.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg',
    },
    {
      id: 23,
      title: 'PHP',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    },
    {
      id: 24,
      title: 'PuTTY',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/putty/putty-original.svg',
    },
    {
      id: 25,
      title: 'Redis',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    },
    {
      id: 26,
      title: 'Ubuntu',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg',
    },
    {
      id: 27,
      title: 'VS Code',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
    },
    {
      id: 28,
      title: 'Vuetify',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuetify/vuetify-original.svg',
    },
    {
      id: 29,
      title: 'Express',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    },
    {
      id: 30,
      title: 'Next.js',
      image:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      id: 31,
      title: 'Laravel',
      image: 'https://cdn.simpleicons.org/laravel/FF2D20',
    },
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
