'use client';

import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

import { Link } from '@/i18n/navigation';

interface ForgotPasswordActionProps {
  label: string;
  href: string;
  sx?: MuiLinkProps['sx'];
}

export const ClientLink = ({ label, href, sx }: ForgotPasswordActionProps) => {
  return (
    <MuiLink component={Link} href={href} sx={sx} underline="none">
      {label}
    </MuiLink>
  );
};
