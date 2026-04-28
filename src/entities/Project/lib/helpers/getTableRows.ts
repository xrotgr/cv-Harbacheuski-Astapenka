import { GetProjectsQuery } from '../../api/getProjects';

import { formatDate } from './formatDate';

export const getTableRows = (data: GetProjectsQuery) => {
  if (!data?.projects) return [];
  return data.projects.map((project) => {
    const startDate = formatDate(project.start_date);
    const endDate = !project.end_date ? 'Till now' : formatDate(project.end_date);
    return { ...project, start_date: startDate, end_date: endDate };
  });
};
