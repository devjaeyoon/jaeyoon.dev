import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/Layout';
import SlidePostSection from '../components/SlidePost/Section';
import RecentPostSection from '../components/RecentPost/Section';
import { SEO } from '../components/SEO';
import { IndexPageProps } from '../types';

export const query = graphql`
  fragment MdxContent on Mdx {
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

  query HomePageTemplate($limit: Int, $skip: Int) {
    allMdx(
      filter: { frontmatter: { category: { ne: "about" } } }
      sort: { frontmatter: { createdAt: DESC } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      nodes {
        ...MdxContent
      }

      pageInfo {
        currentPage
        pageCount
      }
    }

    recommendedPosts: allMdx(
      filter: { frontmatter: { recommended: { eq: true } } }
      sort: { frontmatter: { createdAt: DESC } }
    ) {
      nodes {
        ...MdxContent
      }
    }

    developmentPosts: allMdx(
      filter: { frontmatter: { development: { eq: true } } }
      sort: { frontmatter: { createdAt: DESC } }
    ) {
      nodes {
        ...MdxContent
      }
    }
  }
`;

export default function IndexPage({ data }: PageProps<IndexPageProps['data']>) {
  const developmentPosts = data.developmentPosts.nodes;

  return (
    <Layout>
      <SlidePostSection name="개발 게시물" posts={developmentPosts} />
      <RecentPostSection posts={data.allMdx.nodes} />
    </Layout>
  );
}

export const Head = () => <SEO title="Home" />;
