import { Row } from './getTableRows';

export const getFilteredTableRows = (rows: Row[], searchValue: string) => {
  const term = searchValue.toLowerCase().trim();
  if (!term) return rows;
  return rows.filter((row) =>
    [row.first_name, row.last_name, row.email, row.department_name, row.position_name].some(
      (field) => field?.toLowerCase().includes(term)
    )
  );
};
