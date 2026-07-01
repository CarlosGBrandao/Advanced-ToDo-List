import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const Seletor = ({ label, value, onChange, options, required = false }) => {

  const labelId = `${label.toLowerCase().replace(/\s+/g, '-')}-label`;

  return (
    <FormControl fullWidth required={required}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value || option}>
            {option.label || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};