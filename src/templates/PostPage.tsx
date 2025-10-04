import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Box } from '@chakra-ui/react';
import PostLayout from '../components/Post/PostLayout';
import PostTitle from '../components/Post/PostTitle';
import PostContent from '../components/Post/PostContent';
import Giscus from '../components/Giscus';
import { SEO } from '../components/SEO';
import { PostPageProps } from '../types';

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

export default function PostPageTemplate({
  data,
  children,
}: PageProps<PostPageProps['data']> & { children: React.ReactNode }) {
  return (
    <PostLayout>
      <PostTitle post={data.post} />
      <PostContent content={children} />
      <Giscus />
    </PostLayout>
  );
}

export const Head = ({ data }: { data: PostPageProps['data'] }) => (
  <SEO
    title={data.post.frontmatter.title}
    description={data.post.frontmatter.description}
  />
);
