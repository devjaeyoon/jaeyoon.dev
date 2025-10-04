import { useEffect, useState, useCallback } from 'react';
import qs from 'query-string';
import { CATEGORY_TYPE } from '../constants';
import * as ScrollManager from '../utils/scroll';
import { UseCategoryReturn } from '../types';

const DEST_POS = 316;

export function useCategory(): UseCategoryReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CATEGORY_TYPE.ALL,
  );

  const selectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
    ScrollManager.go(DEST_POS);
    window.history.pushState(
      { category },
      '',
      `${window.location.pathname}?${qs.stringify({ category })}`,
    );
  }, []);

  const changeCategoryHandler = useCallback(() => {
    const { category } = qs.parse(location.search);
    const target = category == null ? CATEGORY_TYPE.ALL : (category as string);

    setSelectedCategory(target);
    ScrollManager.go(DEST_POS);
  }, []);

  const changeCategoryNoScroll = useCallback(() => {
    const { category } = qs.parse(location.search);
    const target = category == null ? CATEGORY_TYPE.ALL : (category as string);

    setSelectedCategory(target);
  }, []);

  useEffect(() => {
    ScrollManager.init();

    return () => {
      ScrollManager.destroy();
    };
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', changeCategoryHandler);

    return () => {
      window.removeEventListener('popstate', changeCategoryHandler);
    };
  }, [changeCategoryHandler]);

  useEffect(() => {
    changeCategoryNoScroll();
  }, [changeCategoryNoScroll]);

  return {
    categories: [], // This should be populated based on your data
    selectedCategory,
    setSelectedCategory: selectCategory,
  };
}
