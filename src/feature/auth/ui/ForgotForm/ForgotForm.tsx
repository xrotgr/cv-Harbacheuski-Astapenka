'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ForgotPasswordFormSchema, ForgotPasswordFormValues } from '@/feature/auth/model/schema';
import { FormHOC, FormTextField } from '@/shared/ui';

import { styles } from './ForgotForm.styles';

export const ForgotForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const t = useTranslations('auth');

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    //TODO: add submiting logic
  };

  return (
    <FormHOC<ForgotPasswordFormValues>
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      formStyle={styles.form}
      resolver={zodResolver(ForgotPasswordFormSchema)}
    >
      <FormTextField<ForgotPasswordFormValues>
        name="email"
        placeholder={t('emailPlaceholder')}
        variant="outlined"
        sx={styles.field}
      />
      <Button type="submit" variant="contained" sx={styles.submitButton} disabled={isSubmitting}>
        {t('login')}
      </Button>
      {submitError ? (
        <Typography color="error" variant="caption" sx={{ textAlign: 'center' }}>
          {submitError}
        </Typography>
      ) : null}
    </FormHOC>
  );
};
