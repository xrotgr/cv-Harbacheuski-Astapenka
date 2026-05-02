import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
import { Cv } from 'cv-graphql';

interface RowProps {
  row: Pick<Cv, 'name' | 'education' | 'description'> & { employee: string };
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
          <IconButton>
            <MoreVertIcon />
          </IconButton>
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
