'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';

import { TableWrapper } from '@/entities/Project/ui/Table/TableWrapper';
import SearchBar from '@/shared/ui/search/SearchBar';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export default function Page() {
  const t = useTranslations('sidebar');
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleInputReset = () => {
    setSearchValue('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 16px)' }}>
      <Typography sx={{ color: 'text.secondary' }}>{t('projects')}</Typography>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <Suspense fallback={<Spinner />}>
        <TableWrapper searchValue={searchValue} handleInputReset={handleInputReset} />
      </Suspense>
    </Box>
  );
}
