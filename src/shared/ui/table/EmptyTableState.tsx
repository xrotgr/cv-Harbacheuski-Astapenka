import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';

interface EmptyTableStateProps {
  colSpan: number;
  onReset: () => void;
}

export const EmptyTableState = ({ colSpan, onReset }: EmptyTableStateProps) => {
  return (
    <TableRow sx={{ height: '100%' }}>
      <TableCell colSpan={colSpan} sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Typography variant="h5">No results found</Typography>
          <Typography>Try another search, check the spelling or use a broader term</Typography>
          <Button onClick={onReset}>RESET SEARCH</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};
