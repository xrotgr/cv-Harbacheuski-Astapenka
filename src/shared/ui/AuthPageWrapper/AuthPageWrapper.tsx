import { Box, Typography } from '@mui/material';

import { ClientLink } from '@/shared/ui';

import { styles } from './AuthPagesWrapper.styles';

interface AuthPageWrapperProps {
  children: React.ReactNode;
  header: string;
  subtitle: string;
  linkName: string;
  linkPath: string;
}

export function AuthPageWrapper({
  children,
  header,
  subtitle,
  linkName,
  linkPath,
}: AuthPageWrapperProps) {
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.contentBox}>
        <Typography variant="h4" sx={styles.pageHeader}>
          {header}
        </Typography>

        <Typography sx={styles.helloText}>{subtitle}</Typography>

        {children}

        <ClientLink label={linkName} href={linkPath} sx={styles.forgotPassword} />
      </Box>
    </Box>
  );
}
