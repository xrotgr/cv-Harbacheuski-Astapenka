import { AuthInput, AuthResult, UpdateTokenResult } from 'cv-graphql';
import { print } from 'graphql';

import { LOGIN, UPDATE_TOKEN } from './documents';

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: Array<{ message: string }>;
};

const getGraphQLEndpoint = () => process.env.NEXT_PUBLIC_GRAPHQL_URL;

const executeGraphQL = async <TData>({
  query,
  variables,
  token,
}: {
  query: string;
  variables?: Record<string, unknown>;
  token?: string;
}): Promise<GraphQLResponse<TData> | null> => {
  const graphqlEndpoint = getGraphQLEndpoint();

  if (!graphqlEndpoint) {
    return null;
  }

  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query,
      ...(variables ? { variables } : {}),
    }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as GraphQLResponse<TData>;
};

export const loginWithCredentials = async (auth: AuthInput): Promise<AuthResult | null> => {
  const result = await executeGraphQL<{ login?: AuthResult }>({
    query: print(LOGIN),
    variables: { auth },
  });

  return result?.data?.login ?? null;
};

export const refreshTokenRequest = async (
  refreshToken: string
): Promise<UpdateTokenResult | null> => {
  const result = await executeGraphQL<{ updateToken?: UpdateTokenResult }>({
    query: print(UPDATE_TOKEN),
    token: refreshToken,
  });

  return result?.data?.updateToken ?? null;
};
