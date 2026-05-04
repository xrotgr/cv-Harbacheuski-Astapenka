'use client';

import { useMutation } from '@apollo/client/react';
import { Box } from '@mui/material';
import { DeleteProfileSkillInput } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { DELETE_PROFILE_SKILLS, GET_USER_PROFILE_SKILLS } from '@/feature/skills/api/documents';
import { selectionKeysToUniqueNames } from '@/feature/skills/lib';

import { ProfileSkillsGrouped } from '../ProfileSkillsGrouped';
import { SkillsProfileActions } from '../SkillsProfileActions';

interface UserSkillsSectionProps {
  userId: string;
}

type DeleteProfileSkillsResponse = {
  deleteProfileSkill: {
    id: string;
  };
};

type DeleteProfileSkillsVariables = {
  skill: DeleteProfileSkillInput;
};

export const UserSkillsSection = ({ userId }: UserSkillsSectionProps) => {
  const t = useTranslations('Skills');
  const [removalMode, setRemovalMode] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(() => new Set());

  const [deleteProfileSkills, { loading: isDeleting }] = useMutation<
    DeleteProfileSkillsResponse,
    DeleteProfileSkillsVariables
  >(DELETE_PROFILE_SKILLS, {
    refetchQueries: [{ query: GET_USER_PROFILE_SKILLS, variables: { userId } }],
    awaitRefetchQueries: true,
  });

  const handleToggleSkillKey = useCallback((key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleRemoveButtonClick = useCallback(async () => {
    if (!userId) {
      return;
    }

    if (!removalMode) {
      setRemovalMode(true);
      setSelectedKeys(new Set());
      return;
    }

    if (selectedKeys.size === 0) {
      setRemovalMode(false);
      return;
    }

    const names = selectionKeysToUniqueNames(selectedKeys);
    if (names.length === 0) {
      setRemovalMode(false);
      setSelectedKeys(new Set());
      return;
    }

    const result = await deleteProfileSkills({
      variables: {
        skill: {
          userId,
          name: names,
        },
      },
    });

    if (result.error) {
      return;
    }

    setRemovalMode(false);
    setSelectedKeys(new Set());
  }, [userId, removalMode, selectedKeys, deleteProfileSkills]);

  const removeButtonLabel = removalMode
    ? selectedKeys.size > 0
      ? t('deleteSelectedSkills', { count: selectedKeys.size })
      : t('exitSkillSelection')
    : t('removeSkills');

  return (
    <Box>
      <ProfileSkillsGrouped
        userId={userId}
        removalMode={removalMode}
        selectedKeys={selectedKeys}
        onToggleSkillKey={handleToggleSkillKey}
      />
      <SkillsProfileActions
        userId={userId}
        removeButtonLabel={removeButtonLabel}
        removeButtonDisabled={isDeleting}
        onRemoveClick={handleRemoveButtonClick}
      />
    </Box>
  );
};
