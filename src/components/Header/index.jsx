import React from 'react';

import { Box } from '@chakra-ui/react';

import Logo from './Logo';
import About from './About';
import Posts from './Posts';
import ThemeModeToggler from './ThemeModeToggler/ThemeModeToggler';

export default function Header() {
  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      zIndex="2"
      width="100%"
      height={{ base: '45px', lg: '60px' }}
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      <Box
        display="flex"
        width={{ base: 'calc(100% - 20px)', xl: '100%' }}
        maxWidth="1024px"
        height="100%"
        margin="0 auto"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Logo />
        </Box>
        <Box
          as="ul"
          display="flex"
          listStyleType="none"
          alignItems="center"
          gap={{ base: 6, lg: 12 }}
          padding={0}
        >
          <Box as="li">
            <About />
          </Box>
          <Box as="li">
            <Posts />
          </Box>
          <Box as="li">
            <ThemeModeToggler />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
