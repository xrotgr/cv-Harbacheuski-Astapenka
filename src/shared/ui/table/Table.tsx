import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface TableProps<T> {
  rows: T[];
  columns: GridColDef[];
}

export default function Table<T extends object>({ rows, columns }: TableProps<T>) {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        sx={{ backgroundColor: 'inherit' }}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        rowHeight={80}
      />
    </Box>
  );
}
