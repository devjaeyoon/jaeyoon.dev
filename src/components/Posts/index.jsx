import React, { useMemo } from 'react';

import { CATEGORY_TYPE } from '../../constants/enum';
import { PostsContainer } from './Container';
import { PostsItem } from './Item';

export const Posts = ({ posts, countOfInitialPost, count, category }) => {
  const refinedPosts = useMemo(
    () =>
      posts
        .filter(
          ({ node }) =>
            category === CATEGORY_TYPE.ALL ||
            node.frontmatter.category === category,
        )
        .slice(0, count * countOfInitialPost),
    [category, count],
  );

  return (
    <PostsContainer>
      {refinedPosts.map(({ node }, index) => (
        <PostsItem node={node} key={`item ${index}`} />
      ))}
    </PostsContainer>
  );
};
