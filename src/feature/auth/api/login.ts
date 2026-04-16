'use client';

import { useLazyQuery } from '@apollo/client/react';

import { AuthInput, AuthResult } from '@/types/cv-graphql';

import { LOGIN } from './documents';

export type LoginArgs = {
  auth: AuthInput;
};

export type LoginResult = {
  login: AuthResult;
};

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN);
};
