'use client';

import { useState } from 'react';

import type { AuthFormValues, ForgotPasswordFormValues } from './schema';

type AuthType = 'login' | 'register' | 'forgot';

export const useAuthSubmit = (type: AuthType) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: AuthFormValues | ForgotPasswordFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      switch (type) {
        case 'login': {
          break;
        }

        case 'register': {
          break;
        }

        case 'forgot': {
          break;
        }

        default:
          throw new Error('unknownType');
      }
    } catch (e) {
      setSubmitError('somethingWentWrong');
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
