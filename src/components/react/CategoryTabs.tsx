import { useCallback, useEffect, useRef } from "react";
import { CATEGORY_ALL } from "@/constants";
import { cn } from "@/lib/cn";

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

function CategoryTab({
  title,
  selectedCategory,
  onClick,
  scrollToCenter,
}: {
  title: string;
  selectedCategory: string;
  onClick: (category: string) => void;
  scrollToCenter: (tabRef: React.RefObject<HTMLLIElement | null>) => void;
}) {
  const tabRef = useRef<HTMLLIElement>(null);
  const isSelected = selectedCategory === title;

  useEffect(() => {
    if (isSelected) {
      scrollToCenter(tabRef);
    }
  }, [isSelected, scrollToCenter]);

  return (
    <li ref={tabRef} className="mr-2 list-none">
      <button
        type="button"
        onClick={() => onClick(title)}
        aria-pressed={isSelected}
        className={cn(
          "rounded-[5px] border px-4 py-2 text-sm",
          isSelected
            ? "border-black bg-white text-black dark:border-white dark:bg-gray-800 dark:text-white"
            : "border-gray-100 bg-white text-black dark:border-gray-600 dark:bg-gray-800 dark:text-white",
        )}
      >
        {title}
      </button>
    </li>
  );
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  const scrollToCenter = useCallback((tabRef: React.RefObject<HTMLLIElement | null>) => {
    if (!tabRef.current || !containerRef.current) {
      return;
    }

    const tabWidth = tabRef.current.offsetWidth;
    const { scrollLeft, offsetWidth: containerWidth } = containerRef.current;
    const tabLeft = tabRef.current.getBoundingClientRect().left;
    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const refineLeft = tabLeft - containerLeft;
    const targetScrollX = scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2;

    containerRef.current.scroll({ left: targetScrollX, behavior: "smooth" });
  }, []);

  return (
    <ul
      ref={containerRef}
      className="m-0 flex list-none overflow-x-auto scroll-smooth whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <CategoryTab
        title={CATEGORY_ALL}
        selectedCategory={selectedCategory}
        onClick={onSelectCategory}
        scrollToCenter={scrollToCenter}
      />
      {categories.map((title) => (
        <CategoryTab
          key={title}
          title={title}
          selectedCategory={selectedCategory}
          onClick={onSelectCategory}
          scrollToCenter={scrollToCenter}
        />
      ))}
    </ul>
  );
}
