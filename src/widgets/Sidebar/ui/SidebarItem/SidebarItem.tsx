import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { useRouter } from 'next/navigation';

import { styles } from './SidebarItem.styles';

interface Props {
  icon: React.ReactNode;
  label: string;
  path: string;
  open: boolean;
  mobile?: boolean;
  selected?: boolean;
}

export const SidebarItem = ({
  icon,
  label,
  path,
  open,
  mobile = false,
  selected = false,
}: Props) => {
  const router = useRouter();
  const showLabel = mobile || open;

  return (
    <Tooltip title={!showLabel ? label : ''} placement="right">
      <ListItemButton
        selected={selected}
        onClick={() => router.push(path)}
        sx={styles.item(mobile, selected)}
      >
        <ListItemIcon sx={styles.icon}>{icon}</ListItemIcon>
        {showLabel && <ListItemText primary={label} />}
      </ListItemButton>
    </Tooltip>
  );
};
