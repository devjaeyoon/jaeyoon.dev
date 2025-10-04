import React, { useCallback, useEffect, useRef } from 'react';
import { ListItem, Button } from '@chakra-ui/react';

interface ItemProps {
  title: string;
  selectedCategory: string;
  onClick: (category: string) => void;
  scrollToCenter: (tabRef: React.RefObject<HTMLLIElement>) => void;
}

export const Item = ({
  title,
  selectedCategory,
  onClick,
  scrollToCenter,
}: ItemProps) => {
  const tabRef = useRef<HTMLLIElement>(null);

  const handleClick = useCallback(() => {
    scrollToCenter(tabRef);
    onClick(title);
  }, [title, onClick, scrollToCenter]);

  useEffect(() => {
    if (selectedCategory === title) {
      scrollToCenter(tabRef);
    }
  }, [selectedCategory, title, scrollToCenter]);

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
