import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...props }) => (
    <a href={href} className="font-semibold text-blue-500 underline" {...props}>
      {children}
    </a>
  ),
};
