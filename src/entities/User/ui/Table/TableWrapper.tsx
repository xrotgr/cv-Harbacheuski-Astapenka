import { useSuspenseQuery } from '@apollo/client/react';
import { GridColDef } from '@mui/x-data-grid';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import Table from '@/shared/ui/Table/Table';

import { GET_USERS } from '../../api/getUsers';
import { getFilteredTableRows } from '../../lib/helpers/getFilteredTableRows';
import { getTableColumns } from '../../lib/helpers/getTableColumns';
import { getTableRows } from '../../lib/helpers/getTableRows';

interface TableWrapperProps {
  searchValue: string;
}

export const TableWrapper = ({ searchValue }: TableWrapperProps) => {
  const t = useTranslations('UsersTable');

  const { data } = useSuspenseQuery(GET_USERS);

  const columns: GridColDef[] = useMemo(() => getTableColumns(t), [t]);

  const rows = useMemo(() => getTableRows(data), [data]);

  const filteredRows = useMemo(() => getFilteredTableRows(rows, searchValue), [rows, searchValue]);

  return <Table columns={columns} rows={filteredRows} />;
};
