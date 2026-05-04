'use client';

import { useQuery } from '@apollo/client/react';
import { Box, Checkbox, CircularProgress, Typography } from '@mui/material';
import { Mastery, SkillCategory, SkillMastery } from 'cv-graphql';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { GET_USER_PROFILE_SKILLS } from '@/feature/skills/api/documents';
import { groupProfileSkillsByCategory, skillToSelectionKey } from '@/feature/skills/lib';

import { SkillLevel } from '../SkillLevel/SkillLevel';

import { styles } from './ProfileSkillsGrouped.styles';

const UNCATEGORIZED_SECTION_ID = '__uncategorized__';

const EMPTY_SELECTED_KEYS = new Set<string>();

type GetUserProfileSkillsData = {
  user: {
    id: string;
    profile: {
      skills: SkillMastery[];
    };
  } | null;
  skillCategories: SkillCategory[];
};

interface ProfileSkillsGroupedProps {
  userId: string;
  removalMode?: boolean;
  selectedKeys?: Set<string>;
  onToggleSkillKey?: (key: string) => void;
}

export const ProfileSkillsGrouped = ({
  userId,
  removalMode = false,
  selectedKeys = EMPTY_SELECTED_KEYS,
  onToggleSkillKey,
}: ProfileSkillsGroupedProps) => {
  const t = useTranslations('Skills');
  const { data, loading, error } = useQuery<GetUserProfileSkillsData>(GET_USER_PROFILE_SKILLS, {
    variables: { userId },
    skip: !userId,
  });

  const sections = useMemo(() => {
    const skills = data?.user?.profile?.skills ?? [];
    const categories = data?.skillCategories ?? [];
    if (!skills.length) {
      return [];
    }
    return groupProfileSkillsByCategory(skills, categories);
  }, [data]);

  if (!userId) {
    return <Typography sx={styles.emptyState}>{t('noSkillsFound')}</Typography>;
  }

  if (loading) {
    return (
      <Box sx={styles.loadingBox}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={styles.emptyState} color="error">
        {t('errorWithMessage', { message: error.message })}
      </Typography>
    );
  }

  if (sections.length === 0) {
    return <Typography sx={styles.emptyState}>{t('noSkillsFound')}</Typography>;
  }

  return (
    <Box sx={styles.root}>
      {sections.map((section) => {
        const title = section.id === UNCATEGORIZED_SECTION_ID ? t('otherSkills') : section.title;

        return (
          <Box key={section.id} component="section" sx={styles.section}>
            <Typography sx={styles.sectionTitle}>{title}</Typography>
            <Box sx={styles.skillsGrid}>
              {section.skills.map((skill) => {
                const key = skillToSelectionKey(skill);
                const checked = selectedKeys.has(key);

                return (
                  <Box
                    key={key}
                    sx={[styles.skillRow, removalMode && styles.skillRowRemoval, styles.skillCell]}
                  >
                    <Checkbox
                      size="small"
                      checked={checked}
                      onChange={() => onToggleSkillKey?.(key)}
                      slotProps={{
                        input: {
                          'aria-label': t('selectSkillForRemoval', { name: skill.name }),
                        },
                      }}
                      sx={[
                        styles.skillSelectCheckbox,
                        removalMode && styles.skillSelectCheckboxVisible,
                      ]}
                    />
                    <SkillLevel label={skill.name} mastery={skill.mastery as Mastery} />
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
