import { JWT } from 'next-auth/jwt';

import { refreshTokenRequest } from '../api/serverAuth';

export const ACCESS_TOKEN_TTL_MS = 10 * 60 * 1000;
export const REFRESH_ACCESS_TOKEN_ERROR = 'RefreshAccessTokenError';

export const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  if (!token.refreshToken) {
    return {
      ...token,
      error: REFRESH_ACCESS_TOKEN_ERROR,
    };
  }

  const updatedToken = await refreshTokenRequest(token.refreshToken);

  if (!updatedToken?.access_token) {
    return {
      ...token,
      error: REFRESH_ACCESS_TOKEN_ERROR,
    };
  }

  return {
    ...token,
    accessToken: updatedToken.access_token,
    refreshToken: updatedToken.refresh_token || token.refreshToken,
    accessTokenExpires: Date.now() + ACCESS_TOKEN_TTL_MS,
    error: undefined,
  };
};
