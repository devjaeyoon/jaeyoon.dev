import React from 'react';

import { Box } from '@chakra-ui/react';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Box
        width="calc(100vw - 40px)"
        maxWidth="900px"
        margin="0 auto"
        minHeight="50vh"
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
