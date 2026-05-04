'use client';

import { Tabs, Tab, Box } from '@mui/material';

import { Link, usePathname } from '@/i18n/navigation';

interface AppTabsProps {
  tabs: Array<{ label: string; value: string }>;
}

export function AppTabs({ tabs }: AppTabsProps) {
  const pathname = usePathname();
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
