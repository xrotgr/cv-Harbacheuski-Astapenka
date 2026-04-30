'use client';

import { Typography } from '@mui/material';
import { Suspense, useState } from 'react';

import { TableWrapper } from '@/entities/User/ui/Table/TableWrapper';
import SearchBar from '@/shared/ui/search/SearchBar';
import { Spinner } from '@/shared/ui/Spinner/Spinner';

export default function UsersPage() {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Typography sx={{ color: 'text.secondary' }}>Employees</Typography>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <Suspense fallback={<Spinner />}>
        <TableWrapper searchValue={searchValue} />
      </Suspense>
    </>
  );
}
