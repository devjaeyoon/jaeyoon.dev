const path = require('path');

const AboutPageTemplate = path.resolve('./src/templates/AboutPage.jsx');
const PostPageTemplate = path.resolve('./src/templates/PostPage.jsx');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    query {
      allPosts: allMdx {
        nodes {
          id
          body
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

  result.data.allPosts.nodes.forEach((node) => {
    if (node.frontmatter.category === 'about') {
      createPage({
        path: '/about',
        component: `${AboutPageTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          id: node.id,
          category: node.frontmatter.category,
        },
      });
    }

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
