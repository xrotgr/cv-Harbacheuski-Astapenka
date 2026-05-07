import { gql, TypedDocumentNode } from '@apollo/client';
import { CreateCvInput, Cv } from 'cv-graphql';

export type CreateCvMutation = {
  createCv: Cv & {
    __typename: 'Cv';
  };
};

type CreateCvMutationVariables = { cv: CreateCvInput };

export const CREATE_CV: TypedDocumentNode<CreateCvMutation, CreateCvMutationVariables> = gql`
  mutation GetUserCvs($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;
