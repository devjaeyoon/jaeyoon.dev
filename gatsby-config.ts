import { GatsbyConfig } from 'gatsby';
import metaConfig from './gatsby-meta-config';

const config: GatsbyConfig = {
  siteMetadata: metaConfig,
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
      },
    },
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        trackingId: metaConfig.trackingId,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        custom: {
          families: ['Pretendard'],
          urls: [
            'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css',
          ],
        },
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/about`,
        name: 'about',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-lodash',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
  ],
};

export default config;
