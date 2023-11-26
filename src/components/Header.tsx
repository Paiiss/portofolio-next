/* eslint-disable react/jsx-key */
import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import siteMetadata from '@/data/siteMetadata';
import {
  Button,
  Container,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
} from '@mui/material';

const Navbar = () => {
  const nav = [
    { name: 'About', route: '#about' },
    { name: 'Blog', route: '#blog' },
  ];
  return (
    <header className="absolute top-0 left-0 z-10 flex w-full items-center bg-transparent">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography
            variant="body1"
            component="div"
            sx={{ flexGrow: 1 }}
            fontWeight="bold"
          >
            <Button color="inherit" disableRipple={true}>
              mfadaffa
            </Button>
          </Typography>

          {/* <nav>
            <List sx={{ display: 'flex' }}>
              {nav.map((item, index) => (
                <ListItem key={index}>
                  <Button href={item.route} color="inherit">
                    {item.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </nav> */}

          <div>
            <ThemeSwitcher />
          </div>
        </Toolbar>
      </Container>
    </header>
  );
};

export default Navbar;
