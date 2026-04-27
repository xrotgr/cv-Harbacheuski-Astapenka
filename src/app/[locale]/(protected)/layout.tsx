import { Box } from '@mui/material';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { Sidebar } from '@/widgets';

import { styles } from './layout.styles';

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email ?? '';
  const userId = session?.user?.id ?? '';

  if (!session) {
    redirect('/auth/login');
  }
  return (
    <Box sx={styles.wrapper}>
      <Sidebar email={email} userId={userId} />
      <Box sx={styles.content}>{children}</Box>
    </Box>
  );
}
