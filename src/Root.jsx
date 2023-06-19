import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import theme from './chakra/theme';

export default function Root({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
