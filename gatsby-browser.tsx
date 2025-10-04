import { GatsbyBrowser } from 'gatsby';

export const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  // IntersectionObserver polyfill
  if (typeof window.IntersectionObserver === 'undefined') {
    import('intersection-observer');
  }
};
