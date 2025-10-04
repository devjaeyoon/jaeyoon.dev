import React, { useMemo } from 'react';
import { CATEGORY_TYPE } from '../../constants/enum';
import { PostsContainer } from './Container';
import { PostsItem } from './Item';

interface PostsProps {
  posts: Array<{ node: any }>;
  countOfInitialPost: number;
  count: number;
  category: string;
}

export const Posts = ({
  posts,
  countOfInitialPost,
  count,
  category,
}: PostsProps) => {
  const refinedPosts = useMemo(
    () =>
      posts
        .filter(
          ({ node }) =>
            category === CATEGORY_TYPE.ALL ||
            node.frontmatter.category === category,
        )
        .slice(0, count * countOfInitialPost),
    [category, count, posts, countOfInitialPost],
  );

  return (
    <PostsContainer>
      {refinedPosts.map(({ node }, index) => (
        <PostsItem node={node} key={`item ${index}`} />
      ))}
    </PostsContainer>
  );
};
