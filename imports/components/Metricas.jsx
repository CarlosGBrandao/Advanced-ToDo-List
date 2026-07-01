import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

export const Metricas = ({ title, value, icon, color = '#000000' }) => {
  return (
    <Card elevation={3} sx={{ minWidth: 200, flexGrow: 1, borderRadius: '8px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" variant="subtitle2" fontWeight="500" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="bold" sx={{ color }}>
              {value}
            </Typography>
          </Box>
          {icon && (
            <Box 
              sx={{ 
                p: 1.5, 
                borderRadius: '50%', 
                backgroundColor: `${color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};