import React, { useCallback, useEffect, useRef } from 'react';

import { ListItem, Button } from '@chakra-ui/react';

export const Item = ({ title, selectedCategory, onClick, scrollToCenter }) => {
  const tabRef = useRef(null);

  const handleClick = useCallback(() => {
    scrollToCenter(tabRef);
    onClick(title);
  }, [tabRef]);

  useEffect(() => {
    if (selectedCategory === title) {
      scrollToCenter(tabRef);
    }
  }, [selectedCategory, tabRef]);

  return (
    <ListItem marginRight="8px" ref={tabRef} className="item" role="tab">
      <Button
        border="1px solid"
        borderColor={selectedCategory === title ? 'black' : 'gray.100'}
        borderRadius="5px"
        backgroundColor="white"
        color="black"
        _dark={{
          borderColor: `${selectedCategory === title ? 'white' : 'gray.600'}`,
          backgroundColor: 'gray.800',
          color: 'white',
        }}
        onClick={handleClick}
      >
        {title}
      </Button>
    </ListItem>
  );
};
