'use client';

import { useMutation, useSuspenseQuery } from '@apollo/client/react';
import { Box } from '@mui/material';
import { UpdateCvInput } from 'cv-graphql';
import { useParams } from 'next/navigation';

import { FormHOC, FormTextField } from '@/shared/ui';
import { SubmitButton } from '@/shared/ui/button/SubmitButton';

import { GET_CV } from '../../api/getCv';
import { UPDATE_CV } from '../../api/updateCv';

export const UpdateCvForm = () => {
  const { id: cvId } = useParams<{ id: string }>();
  const { data } = useSuspenseQuery(GET_CV, {
    variables: { cvId },
  });

  const { __typename, ...cvs } = data.cv;
  const defaultValues = cvs;

  const [updateCv] = useMutation(UPDATE_CV);

  const handleSubmit = (data: UpdateCvInput) => {
    const input = { ...data, cvId };
    updateCv({ variables: { cv: input } });
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 10, px: 8 }}>
      <FormHOC defaultValues={defaultValues} onSubmit={handleSubmit}>
        <Box sx={{ mb: 6 }}>
          <FormTextField name="name" label="Name" sx={{ mb: 3 }} />
          <FormTextField name="education" label="Education" sx={{ mb: 3 }} />
          <FormTextField name="description" label="Description" multiline rows={6} sx={{ mb: 3 }} />
        </Box>
        <SubmitButton sx={{}}>UPDATE</SubmitButton>
      </FormHOC>
    </Box>
  );
};
