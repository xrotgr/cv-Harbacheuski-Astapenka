'use client';

import { DefaultSession } from 'next-auth';
import { createContext, useContext } from 'react';

type User = DefaultSession['user'] & {
  id: string;
  email: string;
};

export const UserProvider = createContext<User | null>(null);

export const useUser = () => {
  const user = useContext(UserProvider);
  if (!user) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return user;
};
