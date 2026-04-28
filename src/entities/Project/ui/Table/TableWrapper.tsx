import { useSuspenseQuery } from '@apollo/client/react';
import { useMemo } from 'react';

import SortableTable from '@/shared/ui/Table/SortableTable';

import { GET_PROJECTS } from '../../api/getProjects';
import { getFilteredTableRows } from '../../lib/helpers/getFilteredTableRows';
import { getTableRows } from '../../lib/helpers/getTableRows';

import { columns } from './tableColumns';
import { Row } from './TableRow';

interface TableWrapperProps {
  searchValue: string;
  handleInputReset: () => void;
}

export const TableWrapper = ({ searchValue, handleInputReset }: TableWrapperProps) => {
  const { data } = useSuspenseQuery(GET_PROJECTS);

  const rows = getTableRows(data);

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
