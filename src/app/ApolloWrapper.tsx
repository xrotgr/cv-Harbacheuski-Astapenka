'use client';

import { HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { getSession } from 'next-auth/react';

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  });

  const authLink = setContext(async (_, { headers }) => {
    const session = await getSession();
    const token = session?.accessToken;
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
