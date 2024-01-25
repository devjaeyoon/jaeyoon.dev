import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import {
  Heading, Text, Box, Flex, Center,
} from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import parseSyntaxHighlighterClassName from '../../utils/code';
import Layout from '../Layout';

const customHTMLElements = {
  h1: (props) => (
    <Heading as="h1" fontSize={36} mt="40px" mb="30px" {...props} />
  ),

  h2: (props) => (
    <Heading as="h2" fontSize={32} mt="40px" mb="20px" {...props} />
  ),

  h3: (props) => (
    <Heading as="h3" fontSize={24} mt="30px" mb="15px" {...props} />
  ),

  h4: (props) => (
    <Heading as="h4" fontSize={20} mt="20px" mb="10px" {...props} />
  ),

  p: (props) => (
    <Text
      fontSize={{ base: '14px', md: '16px', xl: '18px' }}
      color="#202125"
      mt="20px"
      mb="32px"
      lineHeight={{ base: '24px', md: '28px', xl: '32px' }}
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
          fontSize: '20px',
          color: 'gray.600',
          width: '20px',
          display: 'inline-block',
        },
      }}
      fontSize={16}
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
      fontWeight={600}
      target="_blank"
      _hover={{
        textDecoration: 'underline',
      }}
      color="blue.400"
      {...props}
    />
  ),

  blockquote: ({ ...props }) => {
    const { children } = props;

    return (
      <Flex
        as="blockquote"
        color="blackAlpha.900"
        bg="blackAlpha.100"
        columnGap="10px"
        borderLeft="4px solid"
        _dark={{
          color: 'blue.50',
          bg: 'blackAlpha.300',
        }}
        sx={{
          p: {
            margin: 0,
          },
        }}
        padding="10px"
        borderRadius="6px"
        marginTop="20px"
        {...props}
      >
        <Center>
          <svg
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m15.538 18.999-.29 1.259a2.25 2.25 0 0 1-2.02 1.735l-.173.007h-2.111a2.25 2.25 0 0 1-2.147-1.577l-.046-.167-.29-1.257h7.077ZM12 2.001a7.25 7.25 0 0 1 7.25 7.25c0 2.136-.936 4.093-2.765 5.84a.25.25 0 0 0-.071.125l-.528 2.283H8.114l-.526-2.283a.25.25 0 0 0-.071-.124C5.687 13.344 4.75 11.387 4.75 9.25A7.25 7.25 0 0 1 12 2.001Z"
              fill="currentColor"
            />
          </svg>
        </Center>
        <Flex wordBreak="break-word" direction="column">
          {children}
        </Flex>
      </Flex>
    );
  },

  code: ({ ...props }) => {
    const { className, children } = props;
    const match = /language-(\w+)/.exec(className || '');

    if (!match) {
      return (
        <Text
          as="code"
          sx={{
            _after: {
              content: '"`"',
            },
            _before: {
              content: '"`"',
            },
            color: 'gray.900',
            letterSpacing: '-0.04px',
            fontWeight: '600',
            _dark: {
              color: 'gray.50',
            },
          }}
        >
          {children}
        </Text>
      );
    }

    const { addLines, removeLines } = parseSyntaxHighlighterClassName(className);

    return (
      <SyntaxHighlighter
        style={vscDarkPlus}
        customStyle={{ margin: '20px 0px' }}
        showLineNumbers
        PreTag="div"
        language={match[1]}
        wrapLines
        lineProps={(lineNumber) => {
          const style = {
            display: 'table',
            backgroundColor: 'transparent',
            width: '100%',
          };

          if (addLines?.includes(lineNumber)) {
            return { style: { ...style, backgroundColor: '#afa62d30' } };
          }

          if (removeLines?.includes(lineNumber)) {
            return { style: { ...style, backgroundColor: '#5c3232' } };
          }

          return { style };
        }}
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  },
};

export default function PostLayout({ children }) {
  return (
    <MDXProvider components={customHTMLElements}>
      <Layout>{children}</Layout>
    </MDXProvider>
  );
}
