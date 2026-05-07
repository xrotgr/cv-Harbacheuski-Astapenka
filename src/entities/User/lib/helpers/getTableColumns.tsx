import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Avatar, IconButton } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

import { Link } from '@/i18n/navigation';

export const getTableColumns = (t: (key: string) => string) => [
  {
    field: 'avatar',
    headerName: '',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <Avatar
        src={params.value}
        alt={`${params.row.first_name} ${params.row.last_name}`}
        sx={{ width: 45, height: 45, position: 'relative', top: 16 }}
      />
    ),
    flex: 0,
  },
  { field: 'first_name', headerName: t('firstName'), minWidth: 100, flex: 1 },
  { field: 'last_name', headerName: t('lastName'), minWidth: 100, flex: 1 },
  { field: 'email', headerName: t('email'), minWidth: 300, flex: 1 },
  { field: 'department_name', headerName: t('department'), minWidth: 100, flex: 1 },
  { field: 'position_name', headerName: t('position'), minWidth: 200, flex: 1 },
  {
    field: 'link',
    headerName: '',
    width: 100,
    renderCell: (params: GridRenderCellParams) => (
      <IconButton component={Link} href={`users/${params.row.id}/profile`}>
        <KeyboardArrowRightIcon />
      </IconButton>
    ),
    flex: 0,
  },
];
