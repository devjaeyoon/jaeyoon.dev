import React from 'react';
import { Box } from '@chakra-ui/react';
import { PostContentProps } from '../../types';

export default function PostContent({ content }: PostContentProps) {
  return (
    <Box marginTop="40px">
      <Box maxWidth="100%">{content}</Box>
    </Box>
  );
}
