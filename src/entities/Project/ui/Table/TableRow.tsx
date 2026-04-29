import { Chip, TableCell, TableRow, Typography } from '@mui/material';
import { Project } from 'cv-graphql';

interface RowProps {
  row: Project;
}

const borderBottom = { borderBottom: 'none' };

export const Row = ({ row }: RowProps) => {
  return (
    <>
      <TableRow>
        <TableCell sx={borderBottom}>{row.name}</TableCell>
        <TableCell sx={borderBottom}>{row.internal_name}</TableCell>
        <TableCell sx={borderBottom}>{row.domain}</TableCell>
        <TableCell sx={borderBottom}>{row.start_date}</TableCell>
        <TableCell sx={borderBottom}>{row.end_date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Typography sx={{ color: 'text.secondary', mb: 2, fontSize: '14px' }}>
            {row.description}
          </Typography>
          <div>
            {row.environment.map((label) => (
              <Chip key={row.id} variant="outlined" size="small" label={label} sx={{ mr: 2 }} />
            ))}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};
