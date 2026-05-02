import { gql, TypedDocumentNode } from '@apollo/client';
import { User } from 'cv-graphql';

export type GetUserCvsQuery = {
  user: User & {
    __typename: 'User';
  };
};

type GetUserCvsQueryVariables = { userId: string };

export const GET_USER_CVS: TypedDocumentNode<GetUserCvsQuery, GetUserCvsQueryVariables> = gql`
  query GetUserCvs($userId: ID!) {
    user(userId: $userId) {
      id
      cvs {
        id
        name
        education
        description
      }
    }
  }
`;
