import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

export default function PostTitle({ post }) {
  return (
    <Box textAlign="center" padding={{ base: '36px 0', xl: '68px 0' }}>
      <Heading as="h3" fontSize="20px" lineHeight="32px" letterSpacing="-1px">
        {post.frontmatter.tags}
      </Heading>
      <Heading
        as="h1"
        fontSize={{ base: '36px', xl: '44px' }}
        lineHeight={{ base: '40px', xl: '56px' }}
        letterSpacing="-1px"
        marginTop={{ base: '20px', xl: '26px' }}
      >
        {post.frontmatter.title}
      </Heading>
      <Heading
        fontSize="16px"
        color="#9e9e9e"
        lineHeight={{ base: '14px', xl: '32px' }}
        letterSpacing="-1px"
        marginTop={{ base: '20px', xl: '26px' }}
      >
        {post.frontmatter.createdAt}
      </Heading>
    </Box>
  );
}
