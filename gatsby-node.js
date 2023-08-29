const path = require('path');

const AboutPageTemplate = path.resolve('./src/templates/AboutPage.jsx');
const PostPageTemplate = path.resolve('./src/templates/PostPage.jsx');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
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

  const about = result.data.about.nodes[0];

  createPage({
    path: '/about',
    component: `${AboutPageTemplate}?__contentFilePath=${about.internal.contentFilePath}`,
    context: {
      id: about.id,
      category: about.frontmatter.category,
    },
  });

  result.data.allPosts.nodes.forEach((node) => {
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
