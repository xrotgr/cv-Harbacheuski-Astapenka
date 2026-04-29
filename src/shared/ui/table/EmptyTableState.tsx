import { Box, Button, TableCell, TableRow, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

interface EmptyTableStateProps {
  colSpan: number;
  onReset: () => void;
}

export const EmptyTableState = ({ colSpan, onReset }: EmptyTableStateProps) => {
  const t = useTranslations('TableNoResults');

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
          <Typography variant="h5">{t('noResultsFound')}</Typography>
          <Typography>{t('hint')}</Typography>
          <Button onClick={onReset}>{t('resetSearch').toUpperCase()}</Button>
        </Box>
      </TableCell>
    </TableRow>
  );
};
