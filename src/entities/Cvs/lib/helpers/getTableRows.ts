import { Cv } from 'cv-graphql';

import { GetUserCvsQuery } from '../../api/getUserCvs';

export type TableRow = Cv & {
  employee: string;
  details: '';
};

export const getTableRows = (data: GetUserCvsQuery, employee: string): TableRow[] => {
  if (!data?.user.cvs) return [];
  return data.user.cvs.map((cv) => ({ ...cv, employee, details: '' }));
};
