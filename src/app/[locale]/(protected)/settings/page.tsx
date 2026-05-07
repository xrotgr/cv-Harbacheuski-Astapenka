import { Box, Typography } from '@mui/material';

import { ThemeSelect } from '@/feature/theme/ui/ThemeSelect';
import { LanguageSelect } from '@/shared/ui';

export default function Page() {
  return (
    <>
      <Typography sx={{ color: 'text.secondary', mb: 4 }}>Settings</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '800px',
            height: '100vh',
            marginInline: 4,
          }}
        >
          <ThemeSelect />
          <LanguageSelect />
        </Box>
      </Box>
    </>
  );
}
