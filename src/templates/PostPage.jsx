import React from 'react';
import { graphql } from 'gatsby';

import { Box } from '@chakra-ui/react';

import PostLayout from '../components/Post/PostLayout';
import PostTitle from '../components/Post/PostTitle';
import PostContent from '../components/Post/PostContent';
import { SEO } from '../components/SEO';

export const query = graphql`
  query PostPage($id: String) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
        thumbnail {
          childImageSharp {
            gatsbyImageData
          }
        }
        slug
        title
        description
        category
        createdAt
        updatedAt
      }
    }
  }
`;

export default function PostPageTemplate({ data, children }) {
  return (
    <PostLayout>
      <PostTitle post={data.post} />
      <PostContent content={children} />
    </PostLayout>
  );
}

export const Head = ({ data }) => (
  <SEO
    title={data.post.frontmatter.title}
    description={data.post.frontmatter.description}
  />
);
