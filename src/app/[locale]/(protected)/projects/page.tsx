import { gql } from '@apollo/client';

import { query } from '@/app/ApolloClient';

//TODO: test component
export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      internal_name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`;

interface Project {
  id: string;
  name: string;
  internal_name: string;
  domain: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  environment: string | null;
}
interface GetProjectsResponse {
  projects: Project[];
}

export default async function ProjectsPage() {
  const { data, error } = await query<GetProjectsResponse>({
    query: GET_PROJECTS,
  });

  if (error) {
    return <div>Failed to load projects</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <div>{JSON.stringify(data?.projects ?? [], null, 2)}</div>
    </div>
  );
}
