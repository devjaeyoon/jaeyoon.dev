import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PostCardData } from "@/lib/posts";

const TIME_INTERVAL = 5000;

interface SlidePostProps {
  name: string;
  posts: PostCardData[];
}

export default function SlidePost({ name, posts }: SlidePostProps) {
  const [postIndex, setPostIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const moveNext = useCallback(() => {
    setPostIndex((prev) => (prev + 1) % posts.length);
  }, [posts.length]);

  const movePrev = useCallback(() => {
    setPostIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      return;
    }

    const handlePause = () => setIsHovered(true);
    const handleResume = () => setIsHovered(false);

    el.addEventListener("mouseenter", handlePause);
    el.addEventListener("mouseleave", handleResume);
    el.addEventListener("focusin", handlePause);
    el.addEventListener("focusout", handleResume);

    return () => {
      el.removeEventListener("mouseenter", handlePause);
      el.removeEventListener("mouseleave", handleResume);
      el.removeEventListener("focusin", handlePause);
      el.removeEventListener("focusout", handleResume);
    };
  }, []);

  useEffect(() => {
    if (posts.length <= 1 || isHovered) {
      return;
    }

    intervalRef.current = setInterval(moveNext, TIME_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [moveNext, posts.length, isHovered]);

  if (posts.length === 0) {
    return null;
  }

  const current = posts[postIndex];

  return (
    <section
      ref={sectionRef}
      className="pt-15"
      aria-roledescription="carousel"
      aria-label={`${name} 슬라이더`}
    >
      <div className="flex justify-between">
        <h2 className="text-[32px] font-extrabold">{name}</h2>
        <div className="grid content-between">
          {posts.length > 1 && (
            <>
              <div className="flex min-w-[75px] justify-between">
                <button type="button" onClick={movePrev} aria-label="이전 게시물">
                  <svg
                    width="28px"
                    height="23px"
                    viewBox="0 0 28 23"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="m11.492 0 2.121 2.121-7.71 7.711H28v2.999H5.903l7.71 7.711-2.121 2.122L.178 11.35l.019-.018-.018-.019z"
                      stroke="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="scale-x-[-1]"
                  onClick={moveNext}
                  aria-label="다음 게시물"
                >
                  <svg
                    width="28px"
                    height="23px"
                    viewBox="0 0 28 23"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="m11.492 0 2.121 2.121-7.71 7.711H28v2.999H5.903l7.71 7.711-2.121 2.122L.178 11.35l.019-.018-.018-.019z"
                      stroke="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4 flex justify-center gap-1.5">
                {posts.map((post, index) => (
                  <button
                    key={post.slug}
                    type="button"
                    className={`h-2 w-2 rounded-full ${
                      index === postIndex ? "bg-current" : "border border-current bg-transparent"
                    }`}
                    onClick={() => setPostIndex(index)}
                    aria-label={`${post.title} 보기`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="relative mx-auto mt-5 h-[500px] w-full xl:mx-0">
        <AnimatePresence>
          <motion.div
            key={current.slug}
            className="absolute inset-0 h-full w-full"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <a
              href={`/posts/${current.slug}`}
              className="relative block h-full w-full overflow-hidden rounded-[20px] isolate"
            >
              {current.thumbnail ? (
                <img
                  src={current.thumbnail.src}
                  alt=""
                  aria-hidden="true"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-300 dark:bg-gray-600" />
              )}
              <div className="absolute bottom-0 flex h-[200px] w-full flex-col justify-end bg-gradient-to-b from-transparent to-black/80 px-10 pt-[50px] pb-[30px] text-white">
                <p className="truncate text-sm font-medium md:text-base">{current.category}</p>
                <p className="mt-1 line-clamp-2 text-lg font-bold md:text-[30px]">
                  {current.title}
                </p>
                <p className="text-sm font-semibold md:text-xl">{current.description}</p>
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
