import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { Box, Flex, Heading } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import ArrowIcon from '../../../static/ArrowIcon';
import SlidePostCard from './Card';

const TIME_INTERVAL = 100000;

export default function SlidePostSection({ name, posts }) {
  const [postIndex, setPostIndex] = useState(0);
  const intervalRef = useRef();

  const intervalCallback = useCallback(() => {
    setPostIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const moveNextPostIndex = useCallback(() => {
    setPostIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const movePrevPostIndex = useCallback(() => {
    setPostIndex((prev) => (prev - (1 % posts.length)) % posts.length);
  });

  useEffect(() => {
    intervalRef.current = setInterval(intervalCallback, TIME_INTERVAL);

    return () => clearInterval(intervalRef.current);
  }, [intervalCallback]);

  return (
    <Box
      as="section"
      width={{ base: 'calc(100% - 20px)', xl: '100%' }}
      margin={{ base: '0 auto', xl: '0' }}
      paddingTop="120px"
    >
      <Flex justifyContent="space-between">
        <Heading as="h3" fontSize={32} fontWeight={800} fontFamily="Pretendard">
          {name}
        </Heading>
        <Box display="grid" alignContent="space-between">
          <Flex minWidth="75px" justifyContent="space-between">
            <Box as="button" onClick={movePrevPostIndex}>
              <ArrowIcon />
            </Box>
            <Box as="button" transform="scaleX(-1)" onClick={moveNextPostIndex}>
              <ArrowIcon />
            </Box>
          </Flex>
          <Flex gap="6px" justifyContent="center">
            {posts.map((post, index) => (index === postIndex ? (
              <Box
                as="button"
                key={post.frontmatter.slug}
                w="8px"
                h="8px"
                borderRadius="50%"
                bg="currentcolor"
                cursor="pointer"
                onClick={() => setPostIndex(index)}
              />
            ) : (
              <Box
                as="button"
                key={post.frontmatter.slug}
                w="8px"
                h="8px"
                borderRadius="50%"
                border="1px solid"
                cursor="pointer"
                onClick={() => setPostIndex(index)}
              />
            )))}
          </Flex>
        </Box>
      </Flex>

      <Box
        position="relative"
        width="100%"
        height="500px"
        margin={{ base: '20px auto 0', xl: '20px 0' }}
      >
        <AnimatePresence>
          {posts.map((post, index) => {
            if (index === postIndex) {
              return (
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  key={post.frontmatter.slug}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <SlidePostCard
                    thumbnail={
                      post.frontmatter.thumbnail.childImageSharp.gatsbyImageData
                    }
                    slug={post.frontmatter.slug}
                    title={post.frontmatter.title}
                    description={post.frontmatter.description}
                    category={post.frontmatter.category}
                  />
                </motion.div>
              );
            }
          })}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
