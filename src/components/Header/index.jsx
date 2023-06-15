import React from 'react';

import { Box } from '@chakra-ui/react';

import Logo from './Logo';
import About from './About';
import Posts from './Posts';
import ThemeModeToggler from '../ThemeModeToggler/ThemeModeToggler';

export default function Header() {
  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      left="0"
      width="100%"
      height="60px"
      zIndex="999"
      borderBottom="1px"
      borderBottomColor="gray.200"
      transition="box-shadow 0.3s ease"
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      <Box
        width="calc(100vw - 40px)"
        maxWidth="900px"
        height="100%"
        margin="0 auto"
        overflow="hidden"
        display="flex"
      >
        <Box display="flex" alignItems="center" marginRight="24px">
          <Logo />
        </Box>
        <Box
          display="flex"
          flex="1"
          maxHeight="100%"
          justifyContent="space-between"
        >
          <ul />
          <Box
            as="ul"
            display="flex"
            alignItems="center"
            padding="0"
            margin="0"
          >
            <Box
              as="li"
              padding="0 8px"
              height="100%"
              listStyleType="none"
              display="flex"
              alignItems="center"
            >
              <About />
            </Box>
            <Box
              as="li"
              padding="0 8px"
              height="100%"
              listStyleType="none"
              display="flex"
              alignItems="center"
            >
              <Posts />
            </Box>
            <Box
              as="li"
              padding="0 8px"
              height="100%"
              listStyleType="none"
              display="flex"
              alignItems="center"
            >
              <ThemeModeToggler />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
