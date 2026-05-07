'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';

import { TableWrapper } from '@/entities/User/ui/Table/TableWrapper';
import SearchBar from '@/shared/ui/search/SearchBar';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export default function UsersPage() {
  const [searchValue, setSearchValue] = useState('');
  const t = useTranslations('sidebar');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      <Typography sx={{ color: 'text.secondary' }}>{t('employees')}</Typography>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <Suspense fallback={<Spinner />}>
        <TableWrapper searchValue={searchValue} />
      </Suspense>
    </Box>
  );
}
