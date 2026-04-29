import { useMutation } from '@apollo/client/react';

import { fileToBase64 } from '../lib';

import { GET_PROFILE, UPLOAD_AVATAR } from './documents';

type UploadAvatarMutationResult = {
  uploadAvatar: string;
};

type UploadAvatarMutationArgs = {
  avatar: {
    userId: string;
    base64: string;
    size: number;
    type: string;
  };
};

type UploadAvatarParams = {
  userId: string;
  file: File;
};

export const useUploadAvatar = () => {
  const [uploadAvatarMutation] = useMutation<UploadAvatarMutationResult, UploadAvatarMutationArgs>(
    UPLOAD_AVATAR
  );

  const uploadAvatar = async ({ userId, file }: UploadAvatarParams): Promise<string> => {
    const base64 = await fileToBase64(file);
    const { data } = await uploadAvatarMutation({
      variables: {
        avatar: {
          userId,
          base64,
          size: file.size,
          type: file.type,
        },
      },
      refetchQueries: [{ query: GET_PROFILE, variables: { userId } }],
      awaitRefetchQueries: true,
    });

    if (!data?.uploadAvatar) {
      throw new Error('Avatar upload returned empty response');
    }

    return data.uploadAvatar;
  };

  return { uploadAvatar };
};
