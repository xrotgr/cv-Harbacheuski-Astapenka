'use client';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography, Box, Link } from '@mui/material';
import { ReactNode } from 'react';

import { Link as i18nLink } from '@/i18n/navigation';

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
            <Link
              component={i18nLink}
              key={index}
              href={item.href}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {content}
            </Link>
          );
        }

        return <Box key={index}>{content}</Box>;
      })}
    </Breadcrumbs>
  );
}
