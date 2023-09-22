import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Box, Heading } from '@chakra-ui/react';

export default function PostTitle({ post }) {
  return (
    <Box
      as="section"
      textAlign="center"
      padding={{ base: '48px 0', xl: '68px 0' }}
    >
      <Heading as="h3" fontSize="20px" lineHeight="32px" letterSpacing="-1px">
        {post.frontmatter.category}
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
      <Box width="100%" maxWidth="768px" height="375px" margin="40px auto 0px">
        <Box
          position="relative"
          borderRadius="15px"
          overflow="hidden"
          width="100%"
          height="100%"
          isolation="isolate"
        >
          <Box
            display="inline-block"
            width="100%"
            height="100%"
            borderRadius={2}
          >
            <GatsbyImage
              objectFit="cover"
              style={{ width: '100%', height: '100%' }}
              image={post.frontmatter.thumbnail.childImageSharp.gatsbyImageData}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
