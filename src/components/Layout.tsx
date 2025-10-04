import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Box
        as="main"
        width="calc(100vw - 20px)"
        maxWidth="1024px"
        margin="0 auto"
        wordBreak="keep-all"
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
