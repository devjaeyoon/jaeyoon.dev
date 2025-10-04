import React from 'react';
import { Link } from 'gatsby';
import { Box, Text } from '@chakra-ui/react';
import ThemeModeToggler from './ThemeModeToggler/ThemeModeToggler';
import RightMenu from './RightMenu';

export default function Header() {
  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      zIndex="2"
      width="100%"
      height={{ base: '45px', lg: '60px' }}
      backgroundColor="white"
      _dark={{
        backgroundColor: 'gray.800',
      }}
    >
      <Box
        display="flex"
        width={{ base: 'calc(100% - 20px)', xl: '100%' }}
        maxWidth="1024px"
        height="100%"
        margin="0 auto"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
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
        </Box>
        <Box
          as="ul"
          display="flex"
          listStyleType="none"
          alignItems="center"
          gap={{ base: 6, lg: 12 }}
          padding={0}
        >
          <RightMenu name="about" />
          <RightMenu name="posts" />
          <Box as="li">
            <ThemeModeToggler />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
