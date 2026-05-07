'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useRouter } from '@/i18n/navigation';

import { useSignup } from '../api/signup';

import type { AuthFormValues, ForgotPasswordFormValues } from './schema';

type AuthType = 'login' | 'register' | 'forgot';

type GraphQLErrorLike = {
  message?: string;
};

type GraphQLResponseErrorLike = {
  graphQLErrors?: GraphQLErrorLike[];
  errors?: GraphQLErrorLike[];
};

const getApiErrorMessage = (error: unknown): string | null => {
  if (error && typeof error === 'object') {
    const responseError = error as GraphQLResponseErrorLike;
    const graphQLErrorMessage = responseError.graphQLErrors?.[0]?.message;
    if (graphQLErrorMessage) {
      return graphQLErrorMessage;
    }

    const responseErrorMessage = responseError.errors?.[0]?.message;
    if (responseErrorMessage) {
      return responseErrorMessage;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return null;
};

export const useAuthSubmit = (type: AuthType) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [signup] = useSignup();
  const router = useRouter();

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/');
      setShouldRedirect(false);
    }
  }, [router, shouldRedirect]);

  const handleSubmit = async (values: AuthFormValues | ForgotPasswordFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      switch (type) {
        case 'login': {
          const auth = values as AuthFormValues;
          const result = await signIn('credentials', {
            redirect: false,
            auth: JSON.stringify({
              email: auth.email,
              password: auth.password,
            }),
          });

          if (result?.error) {
            setSubmitError('authorizationFailed');
            return;
          }

          setShouldRedirect(true);
          break;
        }

        case 'register': {
          const auth = values as AuthFormValues;

          const signupResult = await signup({
            variables: {
              auth: {
                email: auth.email,
                password: auth.password,
              },
            },
          });

          if (!signupResult.data?.signup?.user) {
            setSubmitError('userExist');
            return;
          }

          const result = await signIn('credentials', {
            redirect: false,
            auth: JSON.stringify({
              email: auth.email,
              password: auth.password,
            }),
          });

          if (result?.error) {
            setSubmitError('authorizationFailed');
            return;
          }

          setShouldRedirect(true);
          break;
        }

        case 'forgot': {
          break;
        }

        default:
          throw new Error('unknownType');
      }
    } catch (error) {
      const apiErrorMessage = getApiErrorMessage(error);
      setSubmitError(apiErrorMessage ?? 'authorizationFailed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setSubmitError(null);

  return {
    handleSubmit,
    isSubmitting,
    submitError,
    clearError,
  };
};
