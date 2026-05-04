'use client';
import { useSuspenseQuery } from '@apollo/client/react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import SortableTable from '@/shared/ui/table/SortableTable';

import { GET_PROJECTS } from '../../api/getProjects';
import { getFilteredTableRows } from '../../lib/helpers/getFilteredTableRows';
import { getTableColumns } from '../../lib/helpers/getTableColumns';
import { getTableRows } from '../../lib/helpers/getTableRows';

import { Row } from './TableRow';

interface TableWrapperProps {
  searchValue: string;
  handleInputReset: () => void;
}

export const TableWrapper = ({ searchValue, handleInputReset }: TableWrapperProps) => {
  const t = useTranslations('ProjectsTable');
  const { data } = useSuspenseQuery(GET_PROJECTS);

  const columns = useMemo(() => getTableColumns(t), [t]);

  const rows = useMemo(() => getTableRows(data, t('tillNow')), [data, t]);

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
