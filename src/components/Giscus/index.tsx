import React, { useCallback, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';

export default function Giscus() {
  const { colorMode } = useColorMode();

  const LoadComments = useCallback(() => {
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'devjaeyoon/jaeyoon.dev');
    script.setAttribute('data-repo-id', 'R_kgDOJb77GA');
    script.setAttribute('data-category', 'Announcements');
    script.setAttribute('data-category-id', 'DIC_kwDOJb77GM4CZ_-e');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute(
      'data-theme',
      colorMode === 'light' ? 'light_high_contrast' : 'dark_protanopia',
    );
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById('comments-container');
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById('comments-container');
      if (comments) comments.innerHTML = '';
    };
  }, [colorMode]);

  useEffect(() => {
    LoadComments();
  }, [LoadComments]);

  return <Box mt="50px" className="giscus" id="comments-container" />;
}
