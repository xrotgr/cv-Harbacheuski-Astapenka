import { Project } from 'cv-graphql';

export const getFilteredTableRows = (rows: Project[], searchValue: string) => {
  const term = searchValue.toLowerCase().trim();
  if (!term) return rows;
  return rows.filter((row) =>
    [row.name, row.internal_name, row.domain].some((field) => field?.toLowerCase().includes(term))
  );
};
