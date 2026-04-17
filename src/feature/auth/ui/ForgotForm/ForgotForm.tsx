'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import { ForgotPasswordFormSchema, ForgotPasswordFormValues, useAuthSubmit } from '@/feature/auth';
import { FormHOC, FormTextField } from '@/shared/ui';

import { styles } from './ForgotForm.styles';

export const ForgotForm = () => {
  const { handleSubmit, isSubmitting, submitError } = useAuthSubmit('forgot');

  const t = useTranslations('auth');

  return (
    <FormHOC<ForgotPasswordFormValues>
      defaultValues={{ email: '' }}
      onSubmit={handleSubmit}
      formStyle={styles.form}
      resolver={zodResolver(ForgotPasswordFormSchema)}
    >
      <FormTextField<ForgotPasswordFormValues>
        name="email"
        label={t('emailPlaceholder')}
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
