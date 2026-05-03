'use client';

import { useMutation } from '@apollo/client/react';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

import { DELETE_CV } from '../../api/deleteCv';
import { GET_USER_CVS } from '../../api/getUserCvs';

export const DeleteCvDialog = ({ cvId, cvName }: { cvId: string; cvName: string }) => {
  const [open, setOpen] = useState(false);
  const [deleteCv] = useMutation(DELETE_CV, { refetchQueries: [GET_USER_CVS] });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    deleteCv({ variables: { cv: { cvId } } });
    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Delete</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">Delete CV</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete CV ${cvName}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            CANCEL
          </Button>
          <Button onClick={handleConfirm}>CONFIRM</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
