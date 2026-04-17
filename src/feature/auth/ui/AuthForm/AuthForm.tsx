'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button, IconButton, InputAdornment, Snackbar, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { SignInFormSchema, useAuthSubmit, type AuthFormValues } from '@/feature/auth';
import { FormHOC, FormTextField } from '@/shared/ui';

import { styles } from './AuthForm.styles';

interface LoginProps {
  formType: 'login' | 'register';
}

export const AuthForm = ({ formType }: LoginProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { handleSubmit, isSubmitting, submitError, clearError } = useAuthSubmit(formType);
  const t = useTranslations('auth');

  const isSnackbarOpen = Boolean(submitError);
  const errorMessage = submitError && (t.has(submitError) ? t(submitError) : submitError);

  const handleTogglePassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    clearError();
  };

  return (
    <FormHOC<AuthFormValues>
      defaultValues={{ email: '', password: '' }}
      onSubmit={handleSubmit}
      formStyle={styles.form}
      resolver={zodResolver(SignInFormSchema)}
    >
      <FormTextField<AuthFormValues>
        name="email"
        label={t('emailPlaceholder')}
        variant="outlined"
        sx={styles.field}
      />
      <FormTextField<AuthFormValues>
        name="password"
        label={t('passwordPlaceholder')}
        type={isPasswordVisible ? 'text' : 'password'}
        variant="outlined"
        sx={styles.field}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={isPasswordVisible ? t('hidePassword') : t('showPassword')}
                  onClick={handleTogglePassword}
                  edge="end"
                  sx={styles.passwordVisibilityButton}
                >
                  <Typography component="span" sx={styles.passwordVisibilityIcon}>
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </Typography>
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button type="submit" variant="contained" sx={styles.submitButton} disabled={isSubmitting}>
        {formType === 'login' ? t('login') : t('signup')}
      </Button>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={handleClose}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </FormHOC>
  );
};
