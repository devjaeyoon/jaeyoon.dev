// @vitest-environment jsdom

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

import PostsList from "@/components/react/PostsList";
import type { ResponsivePostCardData } from "@/lib/posts";

const posts: ResponsivePostCardData[] = [
  {
    slug: "astro-post",
    title: "Astro post",
    description: "Astro description",
    category: "Astro",
    createdAt: "2026.08.28",
    development: false,
  },
  {
    slug: "react-post",
    title: "React post",
    description: "React description",
    category: "React",
    createdAt: "2026.08.27",
    development: false,
  },
];

const horizontalScroll = vi.fn();
const scrollIntoView = vi.fn();
const scrollDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "scroll");
const scrollIntoViewDescriptor = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  "scrollIntoView",
);

beforeAll(() => {
  Object.defineProperty(HTMLElement.prototype, "scroll", {
    configurable: true,
    value: horizontalScroll,
  });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: scrollIntoView,
  });
});

beforeEach(() => {
  window.history.replaceState(null, "", "/posts/");
  horizontalScroll.mockClear();
  scrollIntoView.mockClear();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

afterAll(() => {
  if (scrollDescriptor) {
    Object.defineProperty(HTMLElement.prototype, "scroll", scrollDescriptor);
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, "scroll");
  }

  if (scrollIntoViewDescriptor) {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", scrollIntoViewDescriptor);
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, "scrollIntoView");
  }
});

describe("PostsList", () => {
  it("카테고리 탭 선택 시 게시글을 필터링하고 각 대상을 한 번씩 스크롤한다", () => {
    const pushState = vi.spyOn(window.history, "pushState");
    render(<PostsList posts={posts} categories={["Astro", "React"]} />);
    horizontalScroll.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "React" }));

    expect(screen.getByRole("heading", { name: "React post" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "Astro post" })).toBeNull();
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(horizontalScroll).toHaveBeenCalledTimes(1);
    expect(pushState).toHaveBeenCalledTimes(1);

    horizontalScroll.mockClear();
    scrollIntoView.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "React" }));

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(horizontalScroll).not.toHaveBeenCalled();
    expect(pushState).toHaveBeenCalledTimes(1);
  });

  it("popstate에서는 게시글 목록을 스크롤하지 않고 category를 복원한다", () => {
    render(<PostsList posts={posts} categories={["Astro", "React"]} />);
    horizontalScroll.mockClear();
    scrollIntoView.mockClear();

    act(() => {
      window.history.pushState(null, "", "/posts/?category=Astro");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByRole("heading", { name: "Astro post" })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: "React post" })).toBeNull();
    expect(scrollIntoView).not.toHaveBeenCalled();
    expect(horizontalScroll).toHaveBeenCalledTimes(1);
  });
});
