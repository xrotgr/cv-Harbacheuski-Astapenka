import DescriptionIcon from '@mui/icons-material/Description';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PeopleIcon from '@mui/icons-material/People';
// import TranslateIcon from '@mui/icons-material/Translate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export type SidebarLabelKey =
  | 'employees'
  | 'skills'
  | 'languages'
  | 'cv'
  | 'profile'
  | 'settings'
  | 'logout'
  | 'projects';

export interface SidebarItemConfig {
  labelKey: SidebarLabelKey;
  icon: React.ReactNode;
  path: string;
}

export const sidebarItems: SidebarItemConfig[] = [
  { labelKey: 'employees', icon: <PeopleIcon />, path: '/users' },
  { labelKey: 'skills', icon: <TrendingUpIcon />, path: '/skills' },
  // { labelKey: 'languages', icon: <TranslateIcon />, path: '/languages' },
  { labelKey: 'cv', icon: <DescriptionIcon />, path: '/cvs' },
  { labelKey: 'projects', icon: <FactCheckIcon />, path: '/projects' },
];
