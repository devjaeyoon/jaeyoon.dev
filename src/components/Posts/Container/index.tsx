import React from 'react';
import { Box } from '@chakra-ui/react';

interface PostsContainerProps {
  children: React.ReactNode;
}

export const PostsContainer = React.memo(
  ({ children }: PostsContainerProps) => (
    <Box
      as="ul"
      display="flex"
      listStyleType="none"
      flexWrap="wrap"
      justifyContent="space-between"
      minHeight="calc(100vh - 20rem)"
    >
      {children}
    </Box>
  ),
);
