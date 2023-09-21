import React, { useMemo } from 'react';
import { graphql } from 'gatsby';
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

const BASE_LINE = 80;

function getDistance(currentPos) {
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

export default function PostPage({ data }) {
  const [count, countRef, increaseCount] = useRenderedCount();
  const [category, selectCategory] = useCategory();

  const { siteMetadata } = data.site;
  const { countOfInitialPost } = siteMetadata.configs;
  const posts = data.allMdx.edges;
  const categories = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    [],
  );

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
          category={category}
          selectCategory={selectCategory}
        />
        <Posts
          posts={posts}
          countOfInitialPost={countOfInitialPost}
          count={count}
          category={category}
        />
      </Box>
    </Layout>
  );
}

export const Head = () => <SEO title="Posts" />;
