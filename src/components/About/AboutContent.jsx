import React from 'react';

import { Box } from '@chakra-ui/react';

export default function AboutContent({ content }) {
  return (
    <Box marginTop="70px">
      <Box maxWidth="100%">{content}</Box>
    </Box>
  );
}
