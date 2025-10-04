export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
  image: string;
  trackingId: string;
  configs: {
    countOfInitialPost: number;
  };
  social: {
    github: string;
    email: string;
  };
}

export interface MdxNode {
  id: string;
  frontmatter: {
    title: string;
    date?: string;
    createdAt?: string;
    updatedAt?: string;
    category: string;
    slug?: string;
    description?: string;
    tags?: string[];
    tag?: string;
    thumbnail?: {
      childImageSharp: {
        gatsbyImageData: any;
      };
    };
    recommended?: boolean;
    development?: boolean;
  };
  body?: string;
  excerpt?: string;
  tableOfContents?: {
    items: Array<{
      url: string;
      title: string;
      items?: Array<{
        url: string;
        title: string;
      }>;
    }>;
  };
  timeToRead?: number;
  wordCount?: {
    words: number;
    sentences: number;
    paragraphs: number;
  };
  internal: {
    contentFilePath: string;
  };
}

export interface AllMdx {
  nodes: MdxNode[];
  edges?: Array<{ node: MdxNode }>;
  totalCount?: number;
  pageInfo?: {
    currentPage: number;
    pageCount: number;
  };
}

export interface GraphQLData {
  allMdx?: AllMdx;
  about?: AllMdx;
  allPosts?: AllMdx;
  site?: {
    siteMetadata: {
      configs: {
        countOfInitialPost: number;
      };
    };
  };
}

export interface PageContext {
  id: string;
  category: string;
  slug?: string;
}

export interface PostPageProps {
  data: {
    post: MdxNode;
  };
  pageContext: PageContext;
}

export interface AboutPageProps {
  data: {
    post: MdxNode;
  };
  pageContext: PageContext;
}

export interface PostsPageProps {
  data: GraphQLData;
}

export interface IndexPageProps {
  data: {
    allMdx: AllMdx;
    recommendedPosts: AllMdx;
    developmentPosts: AllMdx;
  };
}

export interface Category {
  name: string;
  count: number;
}

export interface PostItemProps {
  node: MdxNode;
}

export interface RecentPostCardProps {
  node: MdxNode;
}

export interface SlidePostCardProps {
  thumbnail: any;
  slug: string;
  title: string;
  description: string;
  category: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  article?: boolean;
  children?: React.ReactNode;
}

export interface ThemeModeTogglerProps {
  isDark: boolean;
  toggleColorMode: () => void;
}

export interface HeaderProps {
  siteTitle: string;
}

export interface FooterProps {
  siteTitle: string;
}

export interface LayoutProps {
  children: React.ReactNode;
  location?: Location;
}

export interface PostContentProps {
  content: React.ReactNode;
}

export interface PostTitleProps {
  post: MdxNode;
}

export interface PostLayoutProps {
  children: React.ReactNode;
}

export interface AboutContentProps {
  content: React.ReactNode;
}

export interface AboutLayoutProps {
  children: React.ReactNode;
}

export interface GiscusProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: string;
  strict: string;
  reactionsEnabled: string;
  emitMetadata: string;
  inputPosition: string;
  theme: string;
  lang: string;
  loading: string;
}

export interface UseCategoryReturn {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export interface UseIntersectionObserverReturn {
  ref: React.RefObject<HTMLElement>;
  isIntersecting: boolean;
}

export interface UseRenderedCountReturn {
  renderedCount: number;
  setRenderedCount: (count: number) => void;
}

export interface UseScrollEventReturn {
  scrollY: number;
  scrollDirection: 'up' | 'down';
}

export interface UseSiteMetadataReturn {
  siteMetadata: SiteMetadata;
}

export interface StorageCore {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

export interface BrowserStorage extends StorageCore {
  length: number;
  key: (index: number) => string | null;
}

export interface EventManager {
  on: (event: string, callback: Function) => void;
  off: (event: string, callback: Function) => void;
  emit: (event: string, data?: any) => void;
}

export interface ScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
}

export interface VisibleOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export interface VisibleReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
}
