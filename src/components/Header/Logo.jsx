import React from 'react';
import { Link } from 'gatsby';

import { Text } from '@chakra-ui/react';

export default function Logo() {
  return (
    <Link to="/">
      <Text
        fontSize={24}
        fontWeight={700}
        fontFamily="Pretendard"
        letterSpacing="-1px"
        _hover={{
          textDecoration: 'underline',
        }}
        _active={{ bg: 'transparent' }}
      >
        Jaeyoon.dev
      </Text>
    </Link>
  );
}
