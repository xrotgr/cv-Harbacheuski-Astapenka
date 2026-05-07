'use client';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { useTranslations } from 'next-intl';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  '&:hover': {
    boxShadow: alpha(theme.palette.common.white, 0.25),
  },
  width: 'fit-content',
  marginBlock: 20,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    borderRadius: '2rem',
    padding: theme.spacing(1, 1, 1, 0),
    boxShadow: `0 0 0 1px grey`,
    '&:hover': {
      boxShadow: `0 0 0 1px white`,
    },
    '&:focus': {
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}));

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const t = useTranslations('common');
  const search = t('search');

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={search}
        inputProps={{ 'aria-label': search }}
        value={value}
        onChange={onChange}
      />
    </Search>
  );
}
