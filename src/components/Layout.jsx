import React from 'react';

import { Box } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box
        as="main"
        width="100%"
        maxWidth="1024px"
        margin={{ base: '0', lg: '0 auto' }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
