import { gql, TypedDocumentNode } from '@apollo/client';
import { User } from 'cv-graphql';

export type GetUsersQuery = {
  users: (User & {
    __typename: 'User';
  })[];
};

type GetUsersQueryVariables = Record<string, never>;

export const GET_USERS: TypedDocumentNode<GetUsersQuery, GetUsersQueryVariables> = gql`
  query GetUsers {
    users {
      id
      email
      department_name
      position_name
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`;
