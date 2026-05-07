'use client';

import { useMutation } from '@apollo/client/react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CreateCvInput } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { FormHOC, FormTextField } from '@/shared/ui';
import { SubmitButton } from '@/shared/ui/button/SubmitButton';
import { useUser } from '@/UserProvider/UserContext';

import { CREATE_CV } from '../../api/createCv';
import { GET_USER_CVS } from '../../api/getUserCvs';

export const CreateCvButton = () => {
  const t = useTranslations('common');
  const c = useTranslations('CvsTable');

  const { id: userId } = useUser();
  const [createCv] = useMutation(CREATE_CV, {
    refetchQueries: [GET_USER_CVS],
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (data: CreateCvInput) => {
    const input = { ...data, userId };
    createCv({ variables: { cv: input } });
    handleClose();
  };

  return (
    <>
      <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
        {`${t('create')} ${t('cv')}`}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('create') + ' ' + t('cv').toLowerCase()}</DialogTitle>
        <FormHOC
          defaultValues={{ name: '', education: '', description: '' }}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <FormTextField name="name" label={c('name')} sx={{ mb: 3 }} />
            <FormTextField name="education" label={c('education')} sx={{ mb: 3 }} />
            <FormTextField
              name="description"
              label={c('description')}
              multiline
              rows={6}
              sx={{ mb: 3 }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              size="large"
              onClick={handleClose}
              sx={{ px: 10, borderRadius: 5, bgcolor: 'grey' }}
            >
              {t('cancel').toUpperCase()}
            </Button>
            <SubmitButton sx={{ px: 10, borderRadius: 5 }}>
              {t('create').toUpperCase()}
            </SubmitButton>
          </DialogActions>
        </FormHOC>
      </Dialog>
    </>
  );
};
