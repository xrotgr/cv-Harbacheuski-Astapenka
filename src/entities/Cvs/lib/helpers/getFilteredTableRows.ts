import { TableRow } from './getTableRows';

export const getFilteredTableRows = (rows: TableRow[], searchValue: string) => {
  const term = searchValue.toLowerCase().trim();
  if (!term) return rows;
  return rows.filter((row) =>
    [row.name, row.description].some((field) => field?.toLowerCase().includes(term))
  );
};
