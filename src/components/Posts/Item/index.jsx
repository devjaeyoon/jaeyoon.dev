import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Box } from '@chakra-ui/react';

export const PostsItem = ({ node }) => {
  return (
    <Box
      as="li"
      overflow="hidden"
      isolation="isolate"
      width={{ base: '100%', md: '330px' }}
      height="380px"
      marginTop="30px"
      borderRadius="20px"
      boxShadow="0 15px 30px 0 rgba(0, 0, 0, 0.05)"
      backgroundColor="white"
      textAlign="left"
      _dark={{
        backgroundColor: 'gray.700',
      }}
    >
      <Link to={node.frontmatter.slug}>
        <Box width="100%" height="210px">
          <GatsbyImage
            image={node.frontmatter.thumbnail.childImageSharp.gatsbyImageData}
            objectFit="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Box width="100%" height="170px" padding="26px 26px 22px 26px">
          <Box
            overflow="hideen"
            fontSize="13px"
            fontWeight="600"
            fontFamily="Pretendard"
            lineHeight="16px"
            letterSpacing="-1px"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {node.frontmatter.category}
          </Box>
          <Box
            overflow="hidden"
            overflowWrap="break-word"
            height="56px"
            marginTop="6px"
            fontSize="19px"
            fontWeight="700"
            fontFamily="Pretendard"
            lineHeight="28px"
            letterSpacing="-1px"
            wordBreak="keep-all"
            whiteSpace="normal"
            textOverflow="ellipsis"
          >
            {node.frontmatter.title}
          </Box>
          <Box
            overflow="hidden"
            marginTop="22px"
            fontSize="13px"
            fontWeight="500"
            fontFamily="Pretendard"
            lineHeight="16px"
            color="#595959"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {node.frontmatter.createdAt}
          </Box>
        </Box>
      </Link>
    </Box>
  );
};
