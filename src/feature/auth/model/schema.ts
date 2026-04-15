import { z } from 'zod';

import { FORM_ERROR_MESSAGES } from './constants';

const email = z.string().min(1, FORM_ERROR_MESSAGES.REQUIRED).email('Invalid email');
const password = z
  .string()
  .min(1, FORM_ERROR_MESSAGES.REQUIRED)
  .min(5, { message: FORM_ERROR_MESSAGES.PASSWORD });

export const SignInFormSchema = z.object({
  email,
  password,
});

export type AuthFormValues = z.infer<typeof SignInFormSchema>;
export type FormValues = AuthFormValues;
