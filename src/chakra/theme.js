import { extendTheme } from '@chakra-ui/react';

import global from './global';

const theme = {
  styles: {
    global,
  },
  breakpoints: {
    sm: '425px', // Mobile L
    md: '768px', // Tablet
    lg: '1024px', // Laptop
    xl: '1440px', // Laptop L
    '2xl': '1920px', // Desktop
  },
};

export default extendTheme(theme);
