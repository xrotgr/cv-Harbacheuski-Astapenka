import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import { ProfileForm } from '@/feature/profile/ui/ProfileForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  const canEdit = session?.user?.id === id;
  return (
    <div>
      <ProfileForm userId={id} canEdit={canEdit} />
    </div>
  );
}
