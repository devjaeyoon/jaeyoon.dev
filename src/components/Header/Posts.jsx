import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function Posts() {
  return (
    <Link to="/posts">
      <Text
        fontWeight="500"
        fontFamily="Pretendard"
        letterSpacing="-0.5px"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        Posts
      </Text>
    </Link>
  );
}
