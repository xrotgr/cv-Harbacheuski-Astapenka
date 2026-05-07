import { Box } from '@mui/material';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { UserProvider } from '@/UserProvider/UserContext';
import { Sidebar } from '@/widgets';

import { styles } from './layout.styles';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }
  const user = session.user;

  return (
    <UserProvider value={user}>
      <Box sx={styles.wrapper}>
        <Sidebar />
        <Box sx={styles.content}>{children}</Box>
      </Box>
    </UserProvider>
  );
}
