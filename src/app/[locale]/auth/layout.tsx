import { AuthSettingsMenu, Header } from '@/widgets';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <AuthSettingsMenu />
    </div>
  );
}
