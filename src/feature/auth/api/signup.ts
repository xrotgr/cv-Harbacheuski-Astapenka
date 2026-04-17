import { useMutation } from '@apollo/client/react';
import { AuthInput, AuthResult } from 'cv-graphql';

import { SIGNUP } from './documents';

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP);
};
