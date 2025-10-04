import React from 'react';
import { Center } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Center
      as="footer"
      overflow="hidden"
      width="100%"
      height={100}
      fontSize={12}
    >
      © {new Date().getFullYear()}. Lee Jaeyoon all rights reserved.
    </Center>
  );
}
