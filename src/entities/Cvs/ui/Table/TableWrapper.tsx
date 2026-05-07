'use client';
import { useSuspenseQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import SortableTable from '@/shared/ui/table/SortableTable';
import { useUser } from '@/UserProvider/UserContext';

import { GET_USER_CVS } from '../../api/getUserCvs';
import { getFilteredTableRows } from '../../lib/helpers/getFilteredTableRows';
import { getTableColumns } from '../../lib/helpers/getTableColumns';
import { getTableRows } from '../../lib/helpers/getTableRows';

import { Row } from './TableRow';

interface TableWrapperProps {
  searchValue: string;
  handleInputReset: () => void;
}

export const TableWrapper = ({ searchValue, handleInputReset }: TableWrapperProps) => {
  const t = useTranslations('CvsTable');

  const user = useUser();
  const employee = user.name ?? user.email ?? 'email';

  const { data } = useSuspenseQuery(GET_USER_CVS, { variables: { userId: user.id } });

  const columns = useMemo(() => getTableColumns(t), [t]);

  const rows = useMemo(() => getTableRows(data, employee), [data, employee]);

  const filteredRows = useMemo(() => getFilteredTableRows(rows, searchValue), [rows, searchValue]);

  return (
    <SortableTable
      columns={columns}
      rows={filteredRows}
      rowComponent={Row}
      handleInputReset={handleInputReset}
    />
  );
};
