'use client';

import { columns } from '@/entities/Project/ui/Table/tableColumns';
import { Row } from '@/entities/Project/ui/Table/TableRow';
import SortableTable from '@/shared/ui/table/SortableTable';

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
  return <SortableTable columns={columns} rows={rows} rowComponent={Row} />;
}
