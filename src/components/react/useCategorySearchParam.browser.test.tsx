// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCategorySearchParam } from "@/components/react/useCategorySearchParam";
import { CATEGORY_ALL } from "@/constants";

const categories = ["Astro", "React"];

function setUrl(url: string) {
  window.history.replaceState(null, "", url);
}

function getRelativeUrl() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("useCategorySearchParam", () => {
  it("category 검색 파라미터가 없으면 All을 선택한다", () => {
    setUrl("/posts/?page=2#posts");
    const replaceState = vi.spyOn(window.history, "replaceState");

    const { result } = renderHook(() => useCategorySearchParam(categories));

    expect(result.current.selectedCategory).toBe(CATEGORY_ALL);
    expect(replaceState).not.toHaveBeenCalled();
    expect(getRelativeUrl()).toBe("/posts/?page=2#posts");
  });

  it("직접 URL과 popstate에서 유효한 category를 복원한다", () => {
    setUrl("/posts/?category=React#posts");
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);

    const { result } = renderHook(() => useCategorySearchParam(categories));

    expect(result.current.selectedCategory).toBe("React");

    act(() => {
      window.history.pushState(null, "", "/posts/?category=Astro#posts");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(result.current.selectedCategory).toBe("Astro");
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it.each([
    "Unknown",
    CATEGORY_ALL,
  ])("category가 %s이면 다른 파라미터와 hash를 보존하며 정규화한다", (category) => {
    setUrl(`/posts/?page=2&category=${category}&sort=recent#posts`);
    const replaceState = vi.spyOn(window.history, "replaceState");

    const { result } = renderHook(() => useCategorySearchParam(categories));

    expect(result.current.selectedCategory).toBe(CATEGORY_ALL);
    expect(replaceState).toHaveBeenCalledTimes(1);
    expect(getRelativeUrl()).toBe("/posts/?page=2&sort=recent#posts");
  });

  it("선택이 바뀔 때 category 파라미터만 갱신하고 history 항목을 한 번 추가한다", () => {
    setUrl("/posts/?page=2&sort=recent#posts");
    const pushState = vi.spyOn(window.history, "pushState");
    const { result } = renderHook(() => useCategorySearchParam(categories));

    act(() => result.current.setCategorySearchParam("React"));

    expect(result.current.selectedCategory).toBe("React");
    expect(pushState).toHaveBeenCalledTimes(1);
    expect(getRelativeUrl()).toBe("/posts/?page=2&sort=recent&category=React#posts");

    act(() => result.current.setCategorySearchParam("React"));

    expect(pushState).toHaveBeenCalledTimes(1);

    act(() => result.current.setCategorySearchParam(CATEGORY_ALL));

    expect(result.current.selectedCategory).toBe(CATEGORY_ALL);
    expect(pushState).toHaveBeenCalledTimes(2);
    expect(getRelativeUrl()).toBe("/posts/?page=2&sort=recent#posts");
  });
});
