import React from 'react';

import { Box, Spacer } from '@chakra-ui/react';

import Logo from './Logo';
import About from './About';
import Posts from './Posts';
import ThemeModeToggler from '../ThemeModeToggler/ThemeModeToggler';

export default function Header() {
  return (
    <Box
      overflow="hidden"
      as="header"
      position="sticky"
      top="0"
      display="flex"
      paddingLeft={5}
      paddingRight={5}
      columnGap={4}
      zIndex="5"
      alignItems="center"
      width="100%"
      height="70px"
      transition="box-shadow 0.3s ease"
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      <Logo />
      <Spacer />
      <About />
      <Posts />
      <ThemeModeToggler />
    </Box>
  );
}
