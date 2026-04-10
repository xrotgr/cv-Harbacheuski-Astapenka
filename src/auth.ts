import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

type GraphQLLoginResponse = {
  data?: {
    login?: {
      accessToken?: string;
      user?: {
        id: string;
        email?: string;
        name?: string;
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'GraphQL',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;
        if (!graphqlEndpoint || !credentials?.email || !credentials?.password) {
          return null;
        }

        const response = await fetch(graphqlEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  accessToken
                  user {
                    id
                    email
                    name
                  }
                }
              }
            `,
            variables: {
              email: credentials.email,
              password: credentials.password,
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
          name: loginResult.user.name,
          accessToken: loginResult.accessToken,
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
});
