'use client';

import { useState } from 'react';

import { type AuthFormValues } from '@/feature/auth/model/schema';

import { AuthForm } from '../AuthForm';

export const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: AuthFormValues) => {
    //TODO: add submiting logic
  };

  return (
    <>
      <AuthForm handleSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} />
    </>
  );
};
