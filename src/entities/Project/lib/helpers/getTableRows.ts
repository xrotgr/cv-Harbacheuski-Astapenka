import { GetProjectsQuery } from '../../api/getProjects';

import { formatDate } from './formatDate';

export const getTableRows = (data: GetProjectsQuery, endDateDefault: string) => {
  if (!data?.projects) return [];
  return data.projects.map((project) => {
    const start_date = formatDate(project.start_date);
    const end_date = !project.end_date ? endDateDefault : formatDate(project.end_date);
    const internal_name = project.internal_name || '-';
    return { ...project, start_date, end_date, internal_name };
  });
};
