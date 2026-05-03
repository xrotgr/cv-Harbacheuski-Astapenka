'use client';

import { useMutation } from '@apollo/client/react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { CreateCvInput } from 'cv-graphql';
import { useState } from 'react';

import { FormHOC, FormTextField } from '@/shared/ui';
import { SubmitButton } from '@/shared/ui/button/SubmitButton';
import { useUser } from '@/UserProvider/UserContext';

import { CREATE_CV } from '../../api/createCv';
import { GET_USER_CVS } from '../../api/getUserCvs';

export const CreateCvButton = () => {
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
        CREATE CV
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create CV</DialogTitle>
        <FormHOC
          defaultValues={{ name: '', education: '', description: '' }}
          onSubmit={handleSubmit}
        >
          <DialogContent>
            <FormTextField name="name" label="Name" sx={{ mb: 3 }} />
            <FormTextField name="education" label="Education" sx={{ mb: 3 }} />
            <FormTextField
              name="description"
              label="Description"
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
              Cancel
            </Button>
            <SubmitButton sx={{ px: 10, borderRadius: 5 }}>CREATE</SubmitButton>
          </DialogActions>
        </FormHOC>
      </Dialog>
    </>
  );
};
