'use client';

import { Box, Typography } from '@mui/material';
import { Suspense, useState } from 'react';

import { TableWrapper } from '@/entities/Project/ui/Table/TableWrapper';
import SearchBar from '@/shared/ui/search/SearchBar';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export default function Page() {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleInputReset = () => {
    setSearchValue('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography sx={{ color: 'text.secondary' }}>Projects</Typography>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <Suspense fallback={<Spinner />}>
        <TableWrapper searchValue={searchValue} handleInputReset={handleInputReset} />
      </Suspense>
    </Box>
  );
}
