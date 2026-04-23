'use client';

import { gql, TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Avatar, Box, CircularProgress, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { User } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Link } from '@/i18n/navigation';
import SearchBar from '@/shared/ui/search/SearchBar';
import Table from '@/shared/ui/table/Table';

type GetUsersQuery = {
  users: (User & {
    __typename: 'User';
  })[];
};

type GetUsersQueryVariables = Record<string, never>;

const GET_USERS: TypedDocumentNode<GetUsersQuery, GetUsersQueryVariables> = gql`
  query GetUsers {
    users {
      id
      email
      department_name
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;

export default function UsersPage() {
  const t = useTranslations('UsersTable');
  const [searchValue, setSearchValue] = useState('');
  const { loading, error, data } = useQuery(GET_USERS);

  const columns: GridColDef[] = useMemo(
    () => [
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
          <IconButton component={Link} href={`users/${params.row.id}`}>
            <KeyboardArrowRightIcon />
          </IconButton>
        ),
        flex: 0,
      },
    ],
    [t]
  );

  const rows = useMemo(() => {
    if (!data?.users) return [];
    return data.users.map((user) => ({
      ...user,
      ...user.profile,
      profile: undefined,
    }));
  }, [data]);

  const filteredRows = useMemo(() => {
    const term = searchValue.toLowerCase().trim();
    if (!term) return rows;
    return rows.filter((row) =>
      [row.first_name, row.last_name, row.email, row.department_name, row.position_name].some(
        (field) => field?.toLowerCase().includes(term)
      )
    );
  }, [rows, searchValue]);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error) return <>Error {error.message}</>;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <Table columns={columns} rows={filteredRows} />
    </>
  );
}
