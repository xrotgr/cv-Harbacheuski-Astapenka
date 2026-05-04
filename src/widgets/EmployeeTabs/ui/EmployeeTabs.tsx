'use client';

import { Tabs, Tab, Box, Link } from '@mui/material';
import { usePathname } from 'next/navigation';

import { tabsConfig } from '../model';

export function EmployeeTabs({ id }: { id: string }) {
  const pathname = usePathname();
  const tabs = tabsConfig(id);

  const currentTab = tabs.find((tab) => pathname.startsWith(tab.value))?.value || tabs[0].value;

  return (
    <Box>
      <Tabs value={currentTab}>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            component={Link}
            href={tab.value}
          />
        ))}
      </Tabs>
    </Box>
  );
}
