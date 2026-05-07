'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Suspense, useState } from 'react';

import { CreateCvButton } from '@/entities/Cvs/ui/CreateCvFormDialog/CreateCvFormDialog';
import { TableWrapper } from '@/entities/Cvs/ui/Table/TableWrapper';
import SearchBar from '@/shared/ui/search/SearchBar';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export const TablePageWrapper = () => {
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
      <Typography sx={{ color: 'text.secondary' }}>{t('cv')}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mr: 6, flexWrap: 'wrap' }}>
        <SearchBar value={searchValue} onChange={handleInputChange} />
        <CreateCvButton />
      </Box>
      <Suspense fallback={<Spinner />}>
        <TableWrapper searchValue={searchValue} handleInputReset={handleInputReset} />
      </Suspense>
    </Box>
  );
};
