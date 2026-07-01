import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Paper, 
  Typography 
} from '@mui/material';

export const Lista = ({ 
  title, 
  items, 
  icon, 
  primaryExtractor, 
  secondaryExtractor,
  renderActions 
}) => {
  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '600px', margin: '20px auto' }}>

      {title && (
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
      )}

      <List>
        {items.map((item, index) => (
    
          <ListItem 
            key={item._id || index} 
            divider
            secondaryAction={renderActions ? renderActions(item) : null} 
          >
            
            
            {icon && (
              <ListItemIcon>
                {icon}
              </ListItemIcon>
            )}
            
            <ListItemText 
              primary={primaryExtractor(item)} 
              secondary={secondaryExtractor ? secondaryExtractor(item) : null} 
            />
            
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};