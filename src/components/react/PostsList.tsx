import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoryTabs, { useCategoryFilter } from "@/components/react/CategoryTabs";
import { CATEGORY_ALL, COUNT_OF_INITIAL_POST } from "@/constants";
import type { PostCardData } from "@/lib/posts";

const SESSION_STORAGE_KEY = "__jaeyoon_blog_count__";
const SCROLL_BASE_LINE = 80;

function getDocumentHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

function getDistance(currentPos: number) {
  return getDocumentHeight() - currentPos;
}

function toFit(
  cb: () => void,
  {
    dismissCondition = () => false,
    triggerCondition = () => true,
  }: {
    dismissCondition?: () => boolean;
    triggerCondition?: () => boolean;
  } = {},
) {
  let tick = false;
  return () => {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      if (dismissCondition()) {
        tick = false;
        return;
      }
      if (triggerCondition()) {
        tick = false;
        cb();
      }
    });
  };
}

function PostListItem({ post }: { post: PostCardData }) {
  const label = post.category;

  return (
    <li className="mt-[30px] h-[380px] w-full list-none overflow-hidden rounded-[20px] bg-[var(--card-bg)] text-left shadow-[0_15px_30px_0_rgba(0,0,0,0.05)] isolate dark:bg-gray-700">
      <a href={`/posts/${post.slug}`} className="block h-full">
        <div className="h-[210px] w-full overflow-hidden">
          {post.thumbnail ? (
            <img
              src={post.thumbnail.src}
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
          <p className="mt-1.5 line-clamp-2 h-14 text-[19px] font-bold leading-7 tracking-[-1px]">
            {post.title}
          </p>
          <p className="mt-[22px] truncate text-[13px] font-medium leading-4 text-[#595959]">
            {post.createdAt}
          </p>
        </div>
      </a>
    </li>
  );
}

interface PostsListProps {
  posts: PostCardData[];
  categories: string[];
}

export default function PostsList({ posts, categories }: PostsListProps) {
  const { selectedCategory, selectCategory } = useCategoryFilter();
  const [count, setCount] = useState(1);
  const [prevCategory, setPrevCategory] = useState(selectedCategory);
  const countRef = useRef(count);

  // 렌더링 단계에서 이전 카테고리와 현재 카테고리를 비교하여 즉시 상태를 리셋 (React 공식 권장 패턴)
  if (selectedCategory !== prevCategory) {
    setPrevCategory(selectedCategory);
    setCount(1);
  }

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      const parsed = Number(stored);
      if (!Number.isNaN(parsed) && parsed > 0) {
        setCount(parsed);
      }
    }
  }, []);

  useEffect(() => {
    countRef.current = count;
    sessionStorage.setItem(SESSION_STORAGE_KEY, String(count));
  }, [count]);

  const filteredPosts = useMemo(
    () =>
      posts
        .filter((post) => selectedCategory === CATEGORY_ALL || post.category === selectedCategory)
        .slice(0, count * COUNT_OF_INITIAL_POST),
    [posts, selectedCategory, count],
  );

  const increaseCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const onScroll = toFit(increaseCount, {
      dismissCondition: () => {
        const currentPos = window.scrollY + window.innerHeight;
        return getDistance(currentPos) >= SCROLL_BASE_LINE;
      },
      triggerCondition: () => {
        const currentPos = window.scrollY + window.innerHeight;
        return (
          getDistance(currentPos) < SCROLL_BASE_LINE &&
          posts.length > countRef.current * COUNT_OF_INITIAL_POST
        );
      },
    });

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [increaseCount, posts.length]);

  return (
    <div className="pt-[70px]">
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
