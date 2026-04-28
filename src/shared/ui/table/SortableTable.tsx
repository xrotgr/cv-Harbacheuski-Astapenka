'use client';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useMemo, useState } from 'react';

import { getComparator, Order } from '@/shared/lib/getComparator';

interface Column<T> {
  id: keyof T;
  label: string;
}

interface SortableTableProps<T> {
  columns: readonly Column<T>[];
  rows: T[];
  rowComponent: React.ComponentType<{ row: T }>;
}

export default function SortableTable<T extends { id: string }>({
  columns,
  rows,
  rowComponent: Row,
}: SortableTableProps<T>) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof T>(columns[0].id);

  const handleRequestSort = (columnId: keyof T) => {
    const isAsc = orderBy === columnId && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(columnId);
  };

  const sortedRows = useMemo(
    () => [...rows].sort(getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ height: '100vh' }}>
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={() => handleRequestSort(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
