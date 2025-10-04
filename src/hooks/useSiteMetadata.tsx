import { graphql, useStaticQuery } from 'gatsby';
import { UseSiteMetadataReturn } from '../types';

export const useSiteMetadata = (): UseSiteMetadataReturn['siteMetadata'] => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          image
          siteUrl
          trackingId
          social {
            github
            email
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
