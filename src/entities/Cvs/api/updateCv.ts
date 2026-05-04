import { gql, TypedDocumentNode } from '@apollo/client';
import { Cv, UpdateCvInput } from 'cv-graphql';

export type UpdateCvMutation = {
  createCv: Cv & {
    __typename: 'Cv';
  };
};

type UpdateCvMutationVariables = { cv: UpdateCvInput };

export const UPDATE_CV: TypedDocumentNode<UpdateCvMutation, UpdateCvMutationVariables> = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
    }
  }
`;
