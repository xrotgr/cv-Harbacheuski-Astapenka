import { z } from 'zod';
export const ProfileSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  department: z.string().trim().min(1, 'Department is required'),
  position: z.string().trim().min(1, 'Position is required'),
  avatarUrl: z.string().trim().optional(),
});
export type ProfileFormValues = z.infer<typeof ProfileSchema>;
