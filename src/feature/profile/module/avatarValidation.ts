const ALLOWED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/gif'];
const MAX_AVATAR_SIZE = 500 * 1024;

export const getAvatarValidationErrorKey = (file: File): string | null => {
  if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
    return 'profile.avatar.errors.unsupportedFormat';
  }

  if (file.size > MAX_AVATAR_SIZE) {
    return 'profile.avatar.errors.fileTooLarge';
  }

  return null;
};
