import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CATEGORY_ALL } from "@/constants";

function toRelativeUrl(url: URL) {
  return `${url.pathname}${url.search}${url.hash}`;
}

export function useCategorySearchParam(categories: string[]) {
  const validCategories = useMemo(() => new Set(categories), [categories]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);
  const selectedCategoryRef = useRef(CATEGORY_ALL);

  const getValidCategory = useCallback(
    (category: string) =>
      category === CATEGORY_ALL || validCategories.has(category) ? category : CATEGORY_ALL,
    [validCategories],
  );

  const syncFromUrl = useCallback(() => {
    const url = new URL(window.location.href);
    const categorySearchParam = url.searchParams.get("category");
    const category = getValidCategory(categorySearchParam ?? CATEGORY_ALL);

    if (categorySearchParam !== null && category === CATEGORY_ALL) {
      url.searchParams.delete("category");
      window.history.replaceState(window.history.state, "", toRelativeUrl(url));
    }

    selectedCategoryRef.current = category;
    setSelectedCategory(category);
  }, [getValidCategory]);

  useEffect(() => {
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);

    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [syncFromUrl]);

  const setCategorySearchParam = useCallback(
    (category: string) => {
      const nextCategory = getValidCategory(category);

      if (selectedCategoryRef.current === nextCategory) {
        return;
      }

      const url = new URL(window.location.href);
      if (nextCategory === CATEGORY_ALL) {
        url.searchParams.delete("category");
      } else {
        url.searchParams.set("category", nextCategory);
      }

      selectedCategoryRef.current = nextCategory;
      setSelectedCategory(nextCategory);
      window.history.pushState(window.history.state, "", toRelativeUrl(url));
    },
    [getValidCategory],
  );

  return { selectedCategory, setCategorySearchParam };
}
