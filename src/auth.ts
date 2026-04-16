import { print } from 'graphql';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { LOGIN } from '@/feature/auth/api/documents';
import { GRAPHQL_URL } from '@/shared/config/env';

import { AuthInput, AuthResult } from './types/cv-graphql';

type GraphQLLoginResponse = {
  data?: {
    login?: AuthResult;
  };
  errors?: Array<{ message: string }>;
};

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'GraphQL',
      credentials: {
        auth: { label: 'Auth', type: 'text' },
      },
      async authorize(credentials) {
        const graphqlEndpoint = GRAPHQL_URL;
        const authPayload = credentials?.auth;

        if (!graphqlEndpoint || !authPayload) {
          return null;
        }

        let auth: AuthInput;
        try {
          auth = JSON.parse(authPayload) as AuthInput;
        } catch {
          return null;
        }

        const response = await fetch(graphqlEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: print(LOGIN),
            variables: {
              auth,
            },
          }),
        });

        if (!response.ok) {
          return null;
        }

        const result = (await response.json()) as GraphQLLoginResponse;
        const loginResult = result.data?.login;
        if (!loginResult?.user) {
          return null;
        }

        return {
          id: loginResult.user.id,
          email: loginResult.user.email,
          accessToken: loginResult.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'accessToken' in user) {
        token.accessToken = user.accessToken as string | undefined;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },
};

export default NextAuth(authOptions);
