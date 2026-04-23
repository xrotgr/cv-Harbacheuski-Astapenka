import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import TranslateIcon from '@mui/icons-material/Translate';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const sidebarItems = [
  { label: 'Employees', icon: <PeopleIcon />, path: '/employees' },
  { label: 'Skills', icon: <TrendingUpIcon />, path: '/skills' },
  { label: 'Languages', icon: <TranslateIcon />, path: '/languages' },
  { label: 'CVs', icon: <DescriptionIcon />, path: '/projects' },
];
