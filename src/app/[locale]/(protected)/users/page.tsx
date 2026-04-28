'use client';

import { useQuery } from '@apollo/client/react';
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { GET_USERS } from '@/entities/User/api/getUsers';
import { getFilteredTableRows } from '@/entities/User/lib/helpers/getFilteredTableRows';
import { getTableColumns } from '@/entities/User/lib/helpers/getTableColumns';
import { getTableRows } from '@/entities/User/lib/helpers/getTableRows';
import SearchBar from '@/shared/ui/search/SearchBar';
import { Spinner } from '@/shared/ui/Spinner/Spinner';
import Table from '@/shared/ui/Table/Table';

export default function UsersPage() {
  const t = useTranslations('UsersTable');
  const [searchValue, setSearchValue] = useState('');
  const { loading, error, data } = useQuery(GET_USERS);

  const columns: GridColDef[] = useMemo(() => getTableColumns(t), [t]);

  const rows = useMemo(() => getTableRows(data), [data]);

  const filteredRows = useMemo(() => getFilteredTableRows(rows, searchValue), [rows, searchValue]);

  if (loading) return <Spinner />;

  if (error) return <>Error {error.message}</>;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Typography sx={{ color: 'text.secondary' }}>Employees</Typography>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <Table columns={columns} rows={filteredRows} />
    </>
  );
}
