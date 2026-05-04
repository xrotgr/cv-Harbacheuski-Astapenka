import { gql, TypedDocumentNode } from '@apollo/client';
import { Cv } from 'cv-graphql';

export type GetCvQuery = {
  cv: Cv & {
    __typename: 'Cv';
  };
};

type GetCvQueryVariables = { cvId: string };

export const GET_CV: TypedDocumentNode<GetCvQuery, GetCvQueryVariables> = gql`
  query GetUserCvs($cvId: ID!) {
    cv(cvId: $cvId) {
      name
      education
      description
    }
  }
`;
