import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function About() {
  return (
    <Link to="/about">
      <Text
        fontWeight="500"
        fontFamily="Pretendard"
        letterSpacing="-0.5px"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        About
      </Text>
    </Link>
  );
}
