'use client';

import { Box, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

import { getFilteredTableRows } from '@/entities/Project/lib/helpers/getFilteredTableRows';
import { columns } from '@/entities/Project/ui/Table/tableColumns';
import { Row } from '@/entities/Project/ui/Table/TableRow';
import SearchBar from '@/shared/ui/search/SearchBar';
import SortableTable from '@/shared/ui/Table/SortableTable';

const rows = [
  {
    id: '1',
    created_at: 'sds',
    environment: ['React', 'Next.js', 'React hook forms'],
    name: ' Haul Tracking',
    domain: 'Business apps',
    start_date: '02/11/2024',
    end_date: 'Till now',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus illum, velit et quod architecto? Impedit et rem molestiae? Adipisci quod assumenda tempora magnam, ad vero vitae, aliquid facere nisi eos corrupti? Modi esse doloremque ullam magnam fuga dicta consectetur? Officiis nesciunt molestias adipisci accusamus! Explicabo nulla tempore excepturi doloremque!',
  },
  {
    id: '2',
    created_at: 'sds',
    environment: ['React', 'Next.js', 'React hook forms'],
    name: ' Haul Tracking',
    domain: 'Business apps',
    start_date: '02/11/2024',
    end_date: 'Till now',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus illum, velit et quod architecto? Impedit et rem molestiae? Adipisci quod assumenda tempora magnam, ad vero vitae, aliquid facere nisi eos corrupti? Modi esse doloremque ullam magnam fuga dicta consectetur? Officiis nesciunt molestias adipisci accusamus! Explicabo nulla tempore excepturi doloremque!',
  },
  {
    id: '3',
    created_at: 'sds',
    environment: ['React', 'Next.js', 'React hook forms'],
    name: ' Haul Tracking',
    domain: 'Business apps',
    start_date: '02/11/2024',
    end_date: 'Till now',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus illum, velit et quod architecto? Impedit et rem molestiae? Adipisci quod assumenda tempora magnam, ad vero vitae, aliquid facere nisi eos corrupti? Modi esse doloremque ullam magnam fuga dicta consectetur? Officiis nesciunt molestias adipisci accusamus! Explicabo nulla tempore excepturi doloremque!',
  },
  {
    id: '4',
    created_at: 'sds',
    environment: ['React', 'Next.js', 'React hook forms'],
    name: ' Haul Tracking',
    domain: 'Business apps',
    start_date: '02/11/2024',
    end_date: 'Till now',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus illum, velit et quod architecto? Impedit et rem molestiae? Adipisci quod assumenda tempora magnam, ad vero vitae, aliquid facere nisi eos corrupti? Modi esse doloremque ullam magnam fuga dicta consectetur? Officiis nesciunt molestias adipisci accusamus! Explicabo nulla tempore excepturi doloremque!',
  },
  {
    id: '5',
    created_at: 'sds',
    environment: ['React', 'Next.js', 'React hook forms'],
    name: ' Haul Tracking',
    domain: 'Business apps',
    start_date: '02/11/2024',
    end_date: 'Till now',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus illum, velit et quod architecto? Impedit et rem molestiae? Adipisci quod assumenda tempora magnam, ad vero vitae, aliquid facere nisi eos corrupti? Modi esse doloremque ullam magnam fuga dicta consectetur? Officiis nesciunt molestias adipisci accusamus! Explicabo nulla tempore excepturi doloremque!',
  },
  {
    id: '6',
    created_at: 'sds',
    environment: ['React', 'Next.js', 'React hook forms'],
    name: ' Haul Tracking',
    domain: 'Business apps',
    start_date: '02/11/2024',
    end_date: 'Till now',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus illum, velit et quod architecto? Impedit et rem molestiae? Adipisci quod assumenda tempora magnam, ad vero vitae, aliquid facere nisi eos corrupti? Modi esse doloremque ullam magnam fuga dicta consectetur? Officiis nesciunt molestias adipisci accusamus! Explicabo nulla tempore excepturi doloremque!',
  },
];

export default function Page() {
  const [searchValue, setSearchValue] = useState('');

  const filteredRows = useMemo(() => getFilteredTableRows(rows, searchValue), [searchValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleInputReset = () => {
    setSearchValue('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography sx={{ color: 'text.secondary' }}>Projects</Typography>
      <SearchBar value={searchValue} onChange={handleInputChange} />
      <SortableTable
        columns={columns}
        rows={filteredRows}
        rowComponent={Row}
        handleInputReset={handleInputReset}
      />
    </Box>
  );
}
