'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { useRouter } from '@/i18n/navigation';

import { useSignup } from '../api/signup';

import type { AuthFormValues, ForgotPasswordFormValues } from './schema';

type AuthType = 'login' | 'register' | 'forgot';

export const useAuthSubmit = (type: AuthType) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [signup] = useSignup();
  const router = useRouter();

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

          router.push('/');
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
            setSubmitError('authorizationFailed');
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

          router.push('/');
          break;
        }

        case 'forgot': {
          break;
        }

        default:
          throw new Error('unknownType');
      }
    } catch {
      setSubmitError('authorizationFailed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    submitError,
  };
};
