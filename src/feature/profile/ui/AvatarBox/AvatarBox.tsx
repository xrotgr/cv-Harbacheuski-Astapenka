import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { Alert, Avatar, Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import { User } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useDeleteAvatar, useUploadAvatar } from '../../api';
import { getAvatarValidationErrorKey } from '../../module';
import { type ProfileFormValues } from '../../module/schema';

import { styles } from './AvatarBox.styles';

interface AvatarBoxProps {
  user: User;
  canEdit: boolean;
}

export const AvatarBox = ({ user, canEdit }: AvatarBoxProps) => {
  const [snackbarError, setSnackbarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations();
  const { control, setValue } = useFormContext<ProfileFormValues>();
  const avatarValue = useWatch({
    control,
    name: 'avatarUrl',
    defaultValue: user.profile.avatar || '',
  });

  const { deleteAvatar } = useDeleteAvatar();
  const { uploadAvatar } = useUploadAvatar();

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleRemoveAvatar = async () => {
    const previousAvatar = avatarValue;

    try {
      setValue('avatarUrl', '', { shouldDirty: true });
      await deleteAvatar({ userId: user.id });
    } catch {
      setValue('avatarUrl', previousAvatar, { shouldDirty: true });
      setSnackbarError(t('profile.avatar.errors.deleteFailed'));
    }
  };

  const handleAvatarChange = async (file: File | undefined) => {
    if (!file) return;
    const validationErrorKey = getAvatarValidationErrorKey(file);
    if (validationErrorKey) {
      setSnackbarError(t(validationErrorKey));
      return;
    }
    try {
      const avatarUrl = await uploadAvatar({ userId: user.id, file });
      setValue('avatarUrl', avatarUrl, { shouldDirty: true });
    } catch {
      setSnackbarError(t('profile.avatar.errors.uploadFailed'));
    }
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        <Box sx={styles.avatarWrapper}>
          <Avatar src={avatarValue || undefined} sx={styles.avatar}>
            {user.profile.first_name
              ? user.profile.first_name?.[0]?.toUpperCase()
              : user.email?.[0]?.toUpperCase()}
          </Avatar>

          {avatarValue && canEdit && (
            <IconButton
              size="small"
              sx={styles.removeButton}
              onClick={() => void handleRemoveAvatar()}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {canEdit && (
          <Box sx={styles.controlledBox}>
            <Button
              variant="text"
              startIcon={<UploadIcon sx={styles.uploadIcon} />}
              onClick={handleUploadClick}
              sx={styles.uploadButton}
            >
              {t('profile.avatar.uploadButton')}
            </Button>

            <Typography variant="caption" sx={styles.uploadSubtitle}>
              {t('profile.avatar.uploadHint')}
            </Typography>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/gif"
              hidden
              onChange={(e) => handleAvatarChange(e.target.files?.[0])}
            />
          </Box>
        )}
      </Box>

      <Snackbar
        open={Boolean(snackbarError)}
        autoHideDuration={4000}
        onClose={() => setSnackbarError(null)}
      >
        <Alert severity="error" onClose={() => setSnackbarError(null)}>
          {snackbarError}
        </Alert>
      </Snackbar>
    </>
  );
};
