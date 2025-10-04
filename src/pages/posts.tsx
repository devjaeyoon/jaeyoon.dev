import React, { useMemo } from 'react';
import { graphql, PageProps } from 'gatsby';
import _ from 'lodash';
import { Box } from '@chakra-ui/react';
import { useRenderedCount } from '../hooks/useRenderedCount';
import { useCategory } from '../hooks/useCategory';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useScrollEvent } from '../hooks/useScrollEvent';
import Layout from '../components/Layout';
import { Category } from '../components/Category';
import { Posts } from '../components/Posts';
import * as Dom from '../utils/dom';
import * as EventManager from '../utils/event-manager';
import { SEO } from '../components/SEO';
import { PostsPageProps } from '../types';

const BASE_LINE = 80;

function getDistance(currentPos: number): number {
  return Dom.getDocumentHeight() - currentPos;
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        configs {
          countOfInitialPost
        }
      }
    }
    allMdx(
      sort: { frontmatter: { createdAt: DESC } }
      filter: { frontmatter: { category: { ne: "about" } } }
    ) {
      edges {
        node {
          frontmatter {
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
            slug
            category
            description
            title
            updatedAt
            createdAt
          }
        }
      }
    }
  }
`;

export default function PostPage({ data }: PageProps<PostsPageProps['data']>) {
  const [count, countRef, increaseCount] = useRenderedCount();
  const { selectedCategory, setSelectedCategory } = useCategory();

  const { siteMetadata } = data.site!;
  const { countOfInitialPost } = siteMetadata.configs;
  const posts = data.allMdx!.edges!;
  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    [posts],
  ) as string[];

  useIntersectionObserver();
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight;
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE;
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost;

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })();
  });

  return (
    <Layout>
      <Box paddingTop="70px">
        <Category
          categories={categories}
          category={selectedCategory}
          selectCategory={setSelectedCategory}
        />
        <Posts
          posts={posts}
          countOfInitialPost={countOfInitialPost}
          count={count}
          category={selectedCategory}
        />
      </Box>
    </Layout>
  );
}

export const Head = () => <SEO title="Posts" />;
