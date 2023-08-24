import React, { useCallback, useRef } from 'react';

import { Box, UnorderedList } from '@chakra-ui/react';

import { Item } from './Item';

export function Category({ categories, category, selectCategory }) {
  const containerRef = useRef(null);

  const scrollToCenter = useCallback(
    (tabRef) => {
      const { offsetWidth: tabWidth } = tabRef.current;
      const { scrollLeft, offsetWidth: containerWidth } = containerRef.current;
      const tabLeft = tabRef.current.getBoundingClientRect().left;
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const refineLeft = tabLeft - containerLeft;
      const targetScrollX =
        scrollLeft + refineLeft - containerWidth / 2 + tabWidth / 2;

      containerRef.current.scroll({
        left: targetScrollX,
        top: 0,
        behavior: 'smooth',
      });
    },
    [containerRef],
  );

  return (
    <Box>
      <UnorderedList
        display="flex"
        listStyleType="none"
        whiteSpace="nowrap"
        overflowX="scroll"
        margin="0"
        scrollBehavior="smooth"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overlflow-style': 'none', // IE 10+
          overflow: '-moz-scrollbars-none', // Firefox
        }}
        ref={containerRef}
        role="tablist"
        id="category"
      >
        <Item
          title="All"
          selectedCategory={category}
          onClick={selectCategory}
          scrollToCenter={scrollToCenter}
        />
        {categories.map((title, idx) => (
          <Item
            key={idx}
            title={title}
            selectedCategory={category}
            onClick={selectCategory}
            scrollToCenter={scrollToCenter}
          />
        ))}
      </UnorderedList>
    </Box>
  );
}
