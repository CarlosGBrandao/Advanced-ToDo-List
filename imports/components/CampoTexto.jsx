import React from 'react';
import { TextField } from '@mui/material';

export const CampoTexto = ({ isEditing, label, value, onChange, type = "text", multiline = false, rows = 1, required = false, ...props }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      multiline={multiline}
      rows={rows}
      required={required && isEditing} 
      fullWidth
      InputProps={{ 
        readOnly: !isEditing, 
        ...props.InputProps 
      }}
      InputLabelProps={type === 'date' ? { shrink: true } : undefined}
      {...props}
    />
  );
};