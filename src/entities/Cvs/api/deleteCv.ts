import { gql, TypedDocumentNode } from '@apollo/client';
import { Cv, DeleteCvInput } from 'cv-graphql';

export type DeleteCvMutation = {
  deleteCv: Cv & {
    __typename: 'Cv';
  };
};

type DeleteCvMutationVariables = { cv: DeleteCvInput };

export const DELETE_CV: TypedDocumentNode<DeleteCvMutation, DeleteCvMutationVariables> = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`;
