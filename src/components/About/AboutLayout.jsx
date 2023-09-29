import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import { Heading, Text, Box } from '@chakra-ui/react';

import Layout from '../Layout';

const customHTMLElements = {
  h1: (props) => (
    <Heading
      as="h1"
      fontSize={36}
      fontFamily="Pretendard"
      mt="20px"
      mb="10px"
      {...props}
    />
  ),

  h2: (props) => (
    <Heading
      as="h2"
      fontSize={32}
      fontFamily="Pretendard"
      mt="20px"
      mb="10px"
      {...props}
    />
  ),

  h3: (props) => (
    <Heading
      as="h3"
      fontSize={24}
      fontFamily="Pretendard"
      mt="20px"
      mb="10px"
      {...props}
    />
  ),

  h4: (props) => (
    <Heading
      as="h4"
      fontSize={20}
      fontFamily="Pretendard"
      mt="20px"
      mb="10px"
      {...props}
    />
  ),

  p: (props) => (
    <Text
      fontSize={{ base: '14px', md: '16px', xl: '18px' }}
      fontFamily="Pretendard"
      color="#202125"
      mb="32px"
      lineHeight={{ base: '24px', md: '28px', xl: '32px' }}
      {...props}
    />
  ),

  strong: (props) => (
    <Text
      as="strong"
      fontSize="18px"
      fontFamily="Pretendard"
      lineHeight="32px"
      _dark={{
        color: 'white',
      }}
      {...props}
    />
  ),

  li: (props) => (
    <Box
      as="li"
      sx={{
        listStyleType: 'none',
        _before: {
          content: '"•"',
          display: 'inline-block',
          width: '20px',
          fontSize: '20px',
          color: 'gray.600',
        },
      }}
      fontSize={16}
      fontFamily="Pretendard"
      {...props}
    />
  ),

  ol: (props) => (
    <Box as="ol" fontSize={16} mt="16px" listStylePos="inside" {...props} />
  ),

  ul: (props) => (
    <Box
      as="ul"
      sx={{
        '* > ul': {
          margin: 0,
          marginLeft: '20px',
        },
      }}
      fontSize={16}
      mt="16px"
      listStylePos="inside"
      {...props}
    />
  ),

  a: (props) => (
    <Box
      as="a"
      fontFamily="Pretendard"
      fontWeight={600}
      target="_blank"
      _hover={{
        textDecoration: 'underline',
      }}
      color="blue.400"
      {...props}
    />
  ),
};

export default function AboutLayout({ children }) {
  return (
    <MDXProvider components={customHTMLElements}>
      <Layout>{children}</Layout>
    </MDXProvider>
  );
}
