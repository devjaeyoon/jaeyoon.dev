import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Text
      fontSize={24}
      fontWeight="700"
      letterSpacing="-1px"
      _hover={{
        textDecoration: 'underline',
      }}
      padding={1}
      _active={{ bg: 'transparent' }}
    >
      <Link to="/">Jaeyoon.dev</Link>
    </Text>
  );
}
