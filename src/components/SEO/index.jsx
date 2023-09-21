import React from 'react';

import { useSiteMetadata } from '../../hooks/useSiteMetadata';

export function SEO({ title, description, children }) {
  const {
    title: defaultTitle,
    description: defaultDescription,
    author,
    image,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  };

  return (
    <>
      {/* HTML Meta Tags */}
      <title>{`${seo.title} | Jaeyoon.dev`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={seo.description} />

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:creator" content={author} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:imgae" content={image} />
      {children}
    </>
  );
}
