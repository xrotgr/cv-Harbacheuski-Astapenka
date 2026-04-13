'use client';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useId } from 'react';

interface SelectOption<T> {
  value: T;
  text: string;
}

interface CustomSelectProps<T> {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (event: SelectChangeEvent<T>, child?: React.ReactNode) => void;
}

export const CustomSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
}: CustomSelectProps<T>) => {
  const selectId = useId();

  return (
    <FormControl>
      <InputLabel id={`${selectId}-label`}>{label}</InputLabel>
      <Select
        labelId={`${selectId}-label`}
        id={selectId}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
