import { ProfileForm } from '@/feature/profile/ui/ProfileForm';

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;
  return (
    <div>
      <h1>profile{id}</h1>
      <ProfileForm />
    </div>
  );
}
