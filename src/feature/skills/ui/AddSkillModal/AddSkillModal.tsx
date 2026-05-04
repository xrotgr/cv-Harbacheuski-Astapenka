'use client';

import { useMutation, useQuery } from '@apollo/client/react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { AddProfileSkillInput, Mastery } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import {
  ADD_PROFILE_SKILL,
  GET_SKILLS_AND_CATEGORIES,
  GET_USER_PROFILE_SKILLS,
} from '@/feature/skills/api/documents';
import {
  buildGroupedSkillsCatalog,
  catalogSkillToSelectionKey,
  skillToSelectionKey,
  type SkillsCatalogData,
} from '@/feature/skills/lib';
import { CustomSelect } from '@/shared/ui';

import { MASTERY_OPTIONS } from '../../modal';

import { styles } from './AddSkillModal.styles';

interface AddSkillModalProps {
  userId: string;
  open: boolean;
  onClose: () => void;
}

interface AddProfileSkillMutationResponse {
  addProfileSkill: {
    id: string;
  };
}

interface AddProfileSkillMutationVariables {
  skill: AddProfileSkillInput;
}

type ProfileSkillsForFilter = {
  user: {
    profile: {
      skills: { name: string; categoryId?: string | null }[];
    };
  } | null;
};

export const AddSkillModal = ({ userId, open, onClose }: AddSkillModalProps) => {
  const t = useTranslations('Skills');
  const [skillId, setSkillId] = useState('');
  const [mastery, setMastery] = useState<Mastery>(Mastery.Novice);
  const { data } = useQuery<SkillsCatalogData>(GET_SKILLS_AND_CATEGORIES);
  const { data: profileSkillsData, loading: profileSkillsLoading } =
    useQuery<ProfileSkillsForFilter>(GET_USER_PROFILE_SKILLS, {
      variables: { userId },
      skip: !open || !userId,
    });
  const [addProfileSkill, { loading: isSubmitting }] = useMutation<
    AddProfileSkillMutationResponse,
    AddProfileSkillMutationVariables
  >(ADD_PROFILE_SKILL);

  const isProfileSkillsPending =
    open && Boolean(userId) && profileSkillsLoading && !profileSkillsData;

  const catalogDataWithoutAssigned = useMemo(() => {
    if (!data) {
      return undefined;
    }
    if (isProfileSkillsPending) {
      return { ...data, skills: [] };
    }
    const assignedKeys = new Set(
      (profileSkillsData?.user?.profile?.skills ?? []).map((s) =>
        skillToSelectionKey({ name: s.name, categoryId: s.categoryId ?? null })
      )
    );
    const skills = data.skills.filter(
      (skill) => !assignedKeys.has(catalogSkillToSelectionKey(skill))
    );
    return { ...data, skills };
  }, [data, isProfileSkillsPending, profileSkillsData]);

  const groupedData = useMemo(
    () => buildGroupedSkillsCatalog(catalogDataWithoutAssigned),
    [catalogDataWithoutAssigned]
  );

  const resolvedSkillId = useMemo(() => {
    if (!skillId) {
      return '';
    }
    return groupedData.skills.some((s) => s.id === skillId) ? skillId : '';
  }, [groupedData.skills, skillId]);

  const handleSkillChange = (event: SelectChangeEvent) => {
    setSkillId(event.target.value);
  };

  const handleMasteryChange = (event: SelectChangeEvent<Mastery>) => {
    setMastery(event.target.value as Mastery);
  };

  const handleClose = () => {
    setSkillId('');
    setMastery(Mastery.Novice);
    onClose();
  };

  const handleConfirm = async () => {
    const selectedSkill = groupedData.skills.find((skill) => skill.id === resolvedSkillId);
    if (!selectedSkill || !userId) {
      return;
    }

    await addProfileSkill({
      variables: {
        skill: {
          userId,
          name: selectedSkill.name,
          categoryId: selectedSkill.category?.id,
          mastery,
        },
      },
      refetchQueries: [{ query: GET_USER_PROFILE_SKILLS, variables: { userId } }],
      awaitRefetchQueries: true,
    });

    handleClose();
  };

  const hasAvailableSkills = groupedData.skills.length > 0;
  const isConfirmDisabled =
    !resolvedSkillId || !userId || isSubmitting || !hasAvailableSkills || isProfileSkillsPending;
  const masteryOptions = MASTERY_OPTIONS.map((option) => ({
    value: option as Mastery,
    text: t(`mastery.${option}`),
  }));

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={styles.dialogTitle}>
        {t('addSkillTitle')}
        <IconButton onClick={handleClose} sx={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.container}>
          <FormControl fullWidth>
            <InputLabel id="skill-select-label">{t('skill')}</InputLabel>
            <Select
              labelId="skill-select-label"
              value={hasAvailableSkills ? resolvedSkillId : ''}
              label={t('skill')}
              onChange={handleSkillChange}
              disabled={!hasAvailableSkills || isProfileSkillsPending}
              displayEmpty
              MenuProps={{ slotProps: { paper: { sx: styles.menuPaper } } }}
            >
              {groupedData.skillCategories.flatMap((category) => {
                const categorySkills = groupedData.skills.filter(
                  (skill) => skill.category?.id === category.id
                );
                if (categorySkills.length === 0) {
                  return [];
                }

                return [
                  <ListSubheader key={`header-${category.id}`} sx={styles.categoryHeader}>
                    {category.name}
                  </ListSubheader>,
                  ...categorySkills.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </MenuItem>
                  )),
                ];
              })}
            </Select>
            {isProfileSkillsPending ? (
              <FormHelperText>{t('loadingProfileSkills')}</FormHelperText>
            ) : !hasAvailableSkills ? (
              <FormHelperText>{t('noUnassignedSkills')}</FormHelperText>
            ) : null}
          </FormControl>

          <CustomSelect
            label={t('skillMastery')}
            value={mastery}
            options={masteryOptions}
            onChange={handleMasteryChange}
            disabled={isProfileSkillsPending || !hasAvailableSkills}
          />

          <Box sx={styles.actions}>
            <Button variant="outlined" onClick={handleClose} sx={styles.actionButton}>
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              disabled={isConfirmDisabled}
              onClick={handleConfirm}
              sx={styles.actionButton}
            >
              {t('confirm')}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
