import { TableCell, TableRow, Typography } from '@mui/material';
import { Cv } from 'cv-graphql';

import { TableRowDetailsButton } from './TableRowDetailsButton';

interface RowProps {
  row: Pick<Cv, 'id' | 'name' | 'education' | 'description'> & { employee: string };
}

const borderBottom = { borderBottom: 'none' };

export const Row = ({ row }: RowProps) => {
  return (
    <>
      <TableRow>
        <TableCell sx={borderBottom}>{row.name}</TableCell>
        <TableCell sx={borderBottom}>{row.education}</TableCell>
        <TableCell sx={borderBottom}>{row.employee}</TableCell>
        <TableCell align="center" sx={borderBottom}>
          <TableRowDetailsButton rowId={row.id} rowName={row.name} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: '14px' }}>
            {row.description}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};
