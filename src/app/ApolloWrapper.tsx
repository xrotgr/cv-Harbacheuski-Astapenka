'use client';

import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { getSession } from 'next-auth/react';

let cachedAccessToken: string | null = null;
let cachedTokenExpiresAt = 0;
let sessionPromise: Promise<{ accessToken?: string; expires?: string } | null> | null = null;

async function getAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < cachedTokenExpiresAt) {
    return cachedAccessToken;
  }

  if (!sessionPromise) {
    sessionPromise = getSession().finally(() => {
      sessionPromise = null;
    });
  }

  const session = await sessionPromise;
  const token = session?.accessToken ?? null;
  const expiresAt = session?.expires ? new Date(session.expires).getTime() : 0;

  cachedAccessToken = token;
  cachedTokenExpiresAt = expiresAt;

  return token;
}

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessToken();

    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
