import { alpha, Box, LinearProgress, Typography } from '@mui/material';
import { Mastery } from 'cv-graphql';

import { masteryColorMap, masteryProgressMap } from '../../modal';

import { styles } from './SkillLevel.styles';

interface SkillLevelProps {
  label: string;
  mastery: Mastery;
}

export const SkillLevel = ({ label, mastery }: SkillLevelProps) => {
  return (
    <Box sx={styles.container}>
      <LinearProgress
        variant="determinate"
        value={masteryProgressMap[mastery]}
        sx={{
          height: 4,
          width: '65px',
          borderRadius: 2,
          backgroundColor: alpha(masteryColorMap[mastery], 0.2),

          '& .MuiLinearProgress-bar': {
            backgroundColor: masteryColorMap[mastery],
            borderRadius: 2,
          },
        }}
      />
      <Typography sx={styles.label}>{label}</Typography>
    </Box>
  );
};
