import { gql, TypedDocumentNode } from '@apollo/client';
import { Project } from 'cv-graphql';

export type GetProjectsQuery = {
  projects: (Project & {
    __typename: 'Project';
  })[];
};

type GetProjectsQueryVariables = Record<string, never>;

export const GET_PROJECTS: TypedDocumentNode<GetProjectsQuery, GetProjectsQueryVariables> = gql`
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
