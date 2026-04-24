import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from '@mui/icons-material/Upload';
import { Alert, Avatar, Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

import { styles } from './AvatarBox.styles';

interface AvatarBoxProps {
  email: string;
}

export const AvatarBox = ({ email }: AvatarBoxProps) => {
  const [previewAvatar, setPreviewAvatar] = useState<string>('');
  const [snackbarError, setSnackbarError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations();

  const uploadAvatar = async (file: File): Promise<string> => {
    return URL.createObjectURL(file);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (
    file: File | undefined,
    onChange: (avatarUrl: string) => void
  ) => {
    if (!file) return;
    const allowed = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setSnackbarError(t('profile.avatar.errors.unsupportedFormat'));
      return;
    }
    const maxSize = 500 * 1024;
    if (file.size > maxSize) {
      setSnackbarError(t('profile.avatar.errors.fileTooLarge'));
      return;
    }
    try {
      const avatarUrl = await uploadAvatar(file);
      setPreviewAvatar(avatarUrl);
      onChange(avatarUrl);
    } catch {
      setSnackbarError(t('profile.avatar.errors.uploadFailed'));
    }
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        <Box sx={styles.avatarWrapper}>
          <Avatar src={previewAvatar || undefined} sx={styles.avatar}>
            {email?.[0]?.toUpperCase()}
          </Avatar>
          {previewAvatar && (
            <IconButton size="small" sx={styles.removeButton} onClick={() => setPreviewAvatar('')}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        <Controller
          name="avatarUrl"
          render={({ field }) => (
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
                onChange={(e) => handleAvatarChange(e.target.files?.[0], field.onChange)}
              />
            </Box>
          )}
        />
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
