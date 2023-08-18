import React from 'react';
import { graphql } from 'gatsby';

import AboutLayout from '../components/About/AboutLayout';
import AboutContent from '../components/About/AboutContent';

export default function AboutPageTemplate({ data, children }) {
  return (
    <AboutLayout>
      <AboutContent content={children} />
    </AboutLayout>
  );
}

export const query = graphql`
  query PostPage($id: String) {
    post: mdx(id: { eq: $id }) {
      frontmatter {
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
