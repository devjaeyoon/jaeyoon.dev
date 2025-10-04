import { GatsbyNode } from 'gatsby';
import path from 'path';
import { GraphQLData } from './src/types';

const AboutPageTemplate = path.resolve('./src/templates/AboutPage.tsx');
const PostPageTemplate = path.resolve('./src/templates/PostPage.tsx');

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage },
}) => {
  const result = await graphql<GraphQLData>(`
    query {
      about: allMdx(filter: { frontmatter: { category: { eq: "about" } } }) {
        nodes {
          id
          frontmatter {
            category
          }
          internal {
            contentFilePath
          }
        }
      }
      allPosts: allMdx(filter: { frontmatter: { category: { ne: "about" } } }) {
        nodes {
          id
          frontmatter {
            slug
            category
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const about = result.data?.about?.nodes[0];

  if (about) {
    createPage({
      path: '/about',
      component: `${AboutPageTemplate}?__contentFilePath=${about.internal.contentFilePath}`,
      context: {
        id: about.id,
        category: about.frontmatter.category,
      },
    });
  }

  result.data?.allPosts?.nodes.forEach((node) => {
    const postPath = `/posts/${node.frontmatter.slug}`;

    createPage({
      path: postPath,
      component: `${PostPageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        category: node.frontmatter.category,
        slug: node.frontmatter.slug,
      },
    });
  });
};
