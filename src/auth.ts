import { AuthInput } from 'cv-graphql';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginWithCredentials } from '@/feature/auth/api/serverAuth';
import { ACCESS_TOKEN_TTL_MS, refreshAccessToken } from '@/feature/auth/model/token';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'GraphQL',
      credentials: {
        auth: { label: 'Auth', type: 'text' },
      },
      async authorize(credentials) {
        const authPayload = credentials?.auth;

        if (!authPayload) {
          return null;
        }

        let auth: AuthInput;
        try {
          auth = JSON.parse(authPayload) as AuthInput;
        } catch {
          return null;
        }

        const loginResult = await loginWithCredentials(auth);
        if (!loginResult?.user) {
          return null;
        }

        return {
          id: loginResult.user.id,
          email: loginResult.user.email,
          accessToken: loginResult.access_token,
          refreshToken: loginResult.refresh_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'accessToken' in user) {
        token.accessToken = user.accessToken as string | undefined;
        token.refreshToken = (
          'refreshToken' in user ? (user.refreshToken as string | undefined) : undefined
        ) as string | undefined;
        token.accessTokenExpires = Date.now() + ACCESS_TOKEN_TTL_MS;
        token.error = undefined;
      }

      if (token.accessToken && token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub ?? '',
      };
      session.accessToken = token.accessToken as string | undefined;
      session.error = token.error as string | undefined;
      return session;
    },
  },
};

export default NextAuth(authOptions);
