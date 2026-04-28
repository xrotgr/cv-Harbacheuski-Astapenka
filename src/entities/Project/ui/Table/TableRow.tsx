import { Chip, TableCell, TableRow, Typography } from '@mui/material';
import { Project } from 'cv-graphql';

type Row = Pick<
  Project,
  | 'created_at'
  | 'description'
  | 'domain'
  | 'end_date'
  | 'environment'
  | 'id'
  | 'name'
  | 'start_date'
>;

interface RowProps {
  row: Row;
}

export const Row = ({ row }: RowProps) => {
  return (
    <>
      <TableRow>
        <TableCell sx={{ borderBottom: 'none' }}>{row.name}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.domain}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.start_date}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.end_date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
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
