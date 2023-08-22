import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Box } from '@chakra-ui/react';

export default function SlidePostCard({
  thumbnail,
  slug,
  title,
  description,
  category,
}) {
  return (
    <Link to={`/posts/${slug}`}>
      <Box
        transition="all 0.25s ease"
        position="relative"
        borderRadius="20px"
        overflow="hidden"
        width="100%"
        height="100%"
        isolation="isolate"
      >
        <Box display="inline-block" width="100%" height="100%" borderRadius={2}>
          <GatsbyImage
            objectFit="cover"
            style={{ width: '100%', height: '100%' }}
            image={thumbnail}
            alt={`${slug} cover image`}
          />
          <Box
            display="flex"
            position="absolute"
            bottom="0"
            flexDirection="column"
            justifyContent="flex-end"
            width="100%"
            height="200px"
            padding="50px 40px 30px"
            backgroundImage="linear-gradient(to bottom,rgba(0,0,0,0) 14%,rgba(0,0,0,0.8))"
          >
            <Box
              overflow="hidden"
              textOverflow="ellipsis"
              width="100%"
              fontSize={{ base: '13px', md: '16px' }}
              fontWeight="500"
              fontFamily="Pretendard"
              letterSpacing="-1px"
              lineHeight="16px"
              whiteSpace="nowrap"
              color="#fff"
            >
              {category}
            </Box>
            <Box
              overflow="hidden"
              textOverflow="ellipsis"
              overflowWrap="break-word"
              width="100%"
              marginTop="3px"
              fontSize={{ base: '18px', md: '30px' }}
              fontWeight="700"
              fontFamily="Pretendard"
              wordBreak="keep-all"
              whiteSpace="normal"
              color="#fff"
            >
              {title}
            </Box>
            <Box
              fontSize={{ base: '14px', md: '20px' }}
              fontWeight="600"
              fontFamily="Pretendard"
              color="#fff"
            >
              {description}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
