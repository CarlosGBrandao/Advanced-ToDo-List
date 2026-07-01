import React from 'react';
import { Box, Button, Avatar } from '@mui/material';

export const EnviarImagem = ({ currentImage, onImageChange, size = 80 }) => {
  
  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        
        onImageChange(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Avatar 
        src={currentImage} 
        sx={{ width: size, height: size }} 
      />
      <Button variant="outlined" component="label">
        Escolher Foto
        <input 
          type="file" 
          hidden 
          accept="image/*" 
          onChange={handleFile} 
        />
      </Button>
    </Box>
  );
};