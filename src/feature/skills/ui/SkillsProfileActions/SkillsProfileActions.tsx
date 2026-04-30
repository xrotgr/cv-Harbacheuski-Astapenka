'use client';

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { AddSkillModal } from '../AddSkillModal';

import { styles } from './SkillsProfileActions.styles';

interface SkillsProfileActionsProps {
  userId: string;
}

export const SkillsProfileActions = ({ userId }: SkillsProfileActionsProps) => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const t = useTranslations('Skills');

  function handleAdd(): void {
    setAddModalOpen(true);
  }

  function handleRemove(): void {}

  return (
    <>
      <Box sx={styles.container}>
        <Button onClick={handleAdd} startIcon={<AddIcon />} variant="text" sx={styles.addButton}>
          {t('addSkill')}
        </Button>

        <Button
          onClick={handleRemove}
          startIcon={<DeleteForeverIcon />}
          variant="text"
          sx={styles.removeButton}
        >
          {t('removeSkills')}
        </Button>
      </Box>
      <AddSkillModal userId={userId} open={isAddModalOpen} onClose={() => setAddModalOpen(false)} />
    </>
  );
};
