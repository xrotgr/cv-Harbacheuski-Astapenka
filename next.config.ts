import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
