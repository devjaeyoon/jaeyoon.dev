import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import { RecentPostCard } from './Card';

export default function RecentPostSection({ posts }) {
  return (
    <Box as="section" paddingTop="120px">
      <Heading as="h3" fontSize={32} fontWeight={800} fontFamily="Pretendard">
        최신 게시글
      </Heading>
      <Box
        as="ul"
        display="flex"
        listStyleType="none"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {posts.map((node, index) => (
          <RecentPostCard node={node} key={`item ${index}`} />
        ))}
      </Box>
    </Box>
  );
}
