import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './chakra/theme';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
