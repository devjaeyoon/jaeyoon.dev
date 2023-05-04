import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function Posts() {
  return (
    <Link to="/posts">
      <Text
        fontWeight={600}
        letterSpacing="-0.5px"
        _hover={{
          textDecoration: 'underline',
        }}
        padding={1}
        _active={{ bg: 'transparent' }}
      >
        Posts
      </Text>
    </Link>
  );
}
