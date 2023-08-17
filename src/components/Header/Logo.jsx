import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Link to="/">
      <Text
        fontSize={24}
        fontWeight={600}
        fontFamily="Pretendard"
        letterSpacing="-1px"
        _hover={{
          textDecoration: 'underline',
        }}
      >
        Jaeyoon.dev
      </Text>
    </Link>
  );
}
