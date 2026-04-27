import { User } from 'cv-graphql';

import { query } from '@/app/ApolloClient';
import { GET_PROFILE } from '@/feature/profile/api';
import { ProfileForm } from '@/feature/profile/ui/ProfileForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;
  const { data, error } = await query<{ user: User }>({
    query: GET_PROFILE,
    variables: { userId: id },
  });

  if (error) return <div>Failed to load profile</div>;
  if (!data || !data.user) {
    return <div>Failed to load data</div>;
  }
  return (
    <div>
      <h1>profile{id}</h1>
      <ProfileForm user={data?.user} />
    </div>
  );
}
