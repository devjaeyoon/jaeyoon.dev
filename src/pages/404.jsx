import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import Layout from '../components/Layout';
import { SEO } from '../components/SEO';

export default function NotFoundPage() {
  return (
    <Layout>
      <Box paddingTop="60px">
        <Heading margin="0 auto">404 Not Found</Heading>
      </Box>
    </Layout>
  );
}

export const Head = () => <SEO title="404 Not Found" />;
