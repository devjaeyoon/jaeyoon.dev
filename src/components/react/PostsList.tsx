import { useMemo } from "react";
import CategoryTabs, { useCategoryFilter } from "@/components/react/CategoryTabs";
import { CATEGORY_ALL } from "@/constants";
import type { ResponsivePostCardData } from "@/lib/posts";

function PostListItem({ post }: { post: ResponsivePostCardData }) {
  const label = post.category;

  return (
    <li className="mt-[30px] h-[380px] w-full list-none overflow-hidden rounded-[20px] bg-[var(--card-bg)] text-left shadow-[0_15px_30px_0_rgba(0,0,0,0.05)] isolate dark:bg-gray-700">
      <a href={`/posts/${post.slug}/`} className="block h-full">
        <div className="h-[210px] w-full overflow-hidden">
          {post.thumbnail ? (
            <img
              src={post.thumbnail.src}
              srcSet={post.thumbnail.srcSet}
              sizes={post.thumbnail.sizes}
              width={post.thumbnail.width}
              height={post.thumbnail.height}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-600" />
          )}
        </div>
        <div className="h-[170px] w-full px-[26px] pt-[26px] pb-[22px]">
          <p className="truncate text-[13px] font-semibold leading-4 tracking-[-1px]">{label}</p>
          <h2 className="mt-1.5 line-clamp-2 h-14 text-[19px] font-bold leading-7 tracking-[-1px]">
            {post.title}
          </h2>
          <p className="mt-[22px] truncate text-[13px] font-medium leading-4 text-[#595959]">
            {post.createdAt}
          </p>
        </div>
      </a>
    </li>
  );
}

interface PostsListProps {
  posts: ResponsivePostCardData[];
  categories: string[];
}

export default function PostsList({ posts, categories }: PostsListProps) {
  const { selectedCategory, selectCategory } = useCategoryFilter();

  const filteredPosts = useMemo(
    () =>
      posts.filter(
        (post) => selectedCategory === CATEGORY_ALL || post.category === selectedCategory,
      ),
    [posts, selectedCategory],
  );

  return (
    <div className="mt-8">
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={selectCategory}
      />
      <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostListItem key={post.slug} post={post} />
        ))}
      </ul>
    </div>
  );
}
