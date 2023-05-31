import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function About() {
  return (
    <Link to="/about">
      <Text
        fontWeight={600}
        fontFamily="Pretendard"
        letterSpacing="-0.5px"
        _hover={{
          textDecoration: 'underline',
        }}
        padding={1}
        _active={{ bg: 'transparent' }}
      >
        About
      </Text>
    </Link>
  );
}
