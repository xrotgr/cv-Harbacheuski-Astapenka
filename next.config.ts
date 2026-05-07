import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  transpilePackages: ['cv-graphql'],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
