'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useId, useState } from 'react';

import { Link } from '@/i18n/navigation';

import { DeleteCvDialog } from '../DeleteCvDialog/DeleteCvDialog';

export const TableRowDetailsButton = ({ rowId, rowName }: { rowId: string; rowName: string }) => {
  const t = useTranslations('MenuItems');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const buttonId = useId();
  const menuId = useId();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': menuId,
          },
        }}
      >
        <MenuItem component={Link} href={`/cvs/${rowId}/details`} onClick={handleClose}>
          {t('details')}
        </MenuItem>
        <DeleteCvDialog cvId={rowId} cvName={rowName} />
      </Menu>
    </div>
  );
};
