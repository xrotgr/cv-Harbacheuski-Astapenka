import { useMutation } from '@apollo/client/react';

import { DELETE_AVATAR } from './documents';

type DeleteAvatarMutationResult = {
  deleteAvatar: null;
};

type DeleteAvatarMutationArgs = {
  avatar: {
    userId: string;
  };
};

type DeleteAvatarParams = {
  userId: string;
};

export const useDeleteAvatar = () => {
  const [deleteAvatarMutation] = useMutation<DeleteAvatarMutationResult, DeleteAvatarMutationArgs>(
    DELETE_AVATAR
  );

  const deleteAvatar = async ({ userId }: DeleteAvatarParams): Promise<void> => {
    await deleteAvatarMutation({
      variables: {
        avatar: { userId },
      },
    });
  };

  return { deleteAvatar };
};
