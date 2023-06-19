import React from 'react';

import { Box } from '@chakra-ui/react';

export default function PostContent({ content }) {
  return (
    <Box as="section" marginTop="40px">
      <Box maxWidth="100%">{content}</Box>
    </Box>
  );
}
