'use client';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { ReactNode } from 'react';

import { styles } from './AppBreadcrumbs.styles';

type Crumb = {
  label: string;
  href?: string;
  icon?: ReactNode;
};

interface AppBreadcrumbsProps {
  items: Crumb[];
}

export function AppBreadcrumbs({ items }: AppBreadcrumbsProps) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={styles.root}>
      {items.slice(0, 3).map((item, index) => {
        const isSecond = index === 1;

        const content = (
          <Box sx={styles.item}>
            {item.icon}
            <Typography sx={isSecond ? styles.secondText : styles.text}>{item.label}</Typography>
          </Box>
        );

        if (item.href) {
          return (
            <Link key={index} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              {content}
            </Link>
          );
        }

        return <Box key={index}>{content}</Box>;
      })}
    </Breadcrumbs>
  );
}
