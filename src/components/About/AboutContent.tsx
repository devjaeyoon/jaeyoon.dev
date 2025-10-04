import React from 'react';
import { Box } from '@chakra-ui/react';
import { AboutContentProps } from '../../types';

export default function AboutContent({ content }: AboutContentProps) {
  return (
    <Box marginTop="70px">
      <Box maxWidth="100%">{content}</Box>
    </Box>
  );
}
