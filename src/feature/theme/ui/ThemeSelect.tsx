'use client';
import { SelectChangeEvent } from '@mui/material/Select';
import { useColorScheme } from '@mui/material/styles';

import { CustomSelect } from '@/shared/ui/CustomSelect';

type ColorMode = 'light' | 'dark' | 'system';

const options: Array<{ value: ColorMode; text: string }> = [
  { value: 'light', text: 'Light' },
  { value: 'dark', text: 'Dark' },
  { value: 'system', text: 'Device settings' },
];

export const ThemeSelect = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleChange = (e: SelectChangeEvent<ColorMode>) => {
    setMode(e.target.value);
  };

  return <CustomSelect label="Appearance" value={mode} options={options} onChange={handleChange} />;
};
