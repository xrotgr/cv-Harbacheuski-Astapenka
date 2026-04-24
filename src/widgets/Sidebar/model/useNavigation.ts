'use client';

import { usePathname } from 'next/navigation';

import { isPathMatch } from './matchPath';
import { sidebarItems } from './sidebar.config';

export const useNavigation = () => {
  const pathname = usePathname();

  const selectedPath = sidebarItems.find((item) => isPathMatch(pathname, item.path))?.path ?? '';

  return {
    selectedPath,
    items: sidebarItems,
  };
};
