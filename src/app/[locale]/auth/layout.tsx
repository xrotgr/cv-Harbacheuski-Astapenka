import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { AuthSettingsMenu, Header } from '@/widgets';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }
  return (
    <div>
      <Header />
      <main>{children}</main>
      <AuthSettingsMenu />
    </div>
  );
}
