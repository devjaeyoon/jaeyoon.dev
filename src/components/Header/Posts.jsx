import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function Posts() {
  return (
    <Text
      fontSize={18}
      fontWeight={600}
      letterSpacing="-0.5px"
      _hover={{
        textDecoration: 'underline',
      }}
    >
      <Link to="/posts">Posts</Link>
    </Text>
  );
}
