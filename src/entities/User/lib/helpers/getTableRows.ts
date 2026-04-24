import { Profile, User } from 'cv-graphql';

import { GetUsersQuery } from '../../api/getUsers';

export type Row = Omit<User, 'profile'> & Pick<Profile, 'first_name' | 'last_name' | 'avatar'>;

export const getTableRows = (data: GetUsersQuery | undefined): Row[] => {
  if (!data?.users) return [];
  return data.users.map((user) => ({
    ...user,
    first_name: user.profile.first_name,
    last_name: user.profile.last_name,
    avatar: user.profile.avatar,
    profile: undefined,
  }));
};
