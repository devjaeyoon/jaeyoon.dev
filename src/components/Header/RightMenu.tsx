import React from 'react';
import { Link } from 'gatsby';
import { Box, Text } from '@chakra-ui/react';

interface RightMenuProps {
  name: string;
}

export default function RightMenu({ name }: RightMenuProps) {
  return (
    <Box as="li">
      <Link to={`/${name}`}>
        <Text
          fontWeight="500"
          fontFamily="Pretendard"
          letterSpacing="-0.5px"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {name}
        </Text>
      </Link>
    </Box>
  );
}
