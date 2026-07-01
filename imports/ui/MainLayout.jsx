import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Avatar, 
  Divider,
  Button
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);


  const user = useTracker(() => Meteor.user());

  const nomeUsuario = user?.profile?.nome || user?.username || 'Usuário';
  const emailUsuario = user?.profile?.email || 'email@naocadastrado.com';
  const fotoUsuario = user?.profile?.fotoBase64 || '';

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDrawerOpen(false); 
  };

  const handleLogout = () => {
    Meteor.logout(() => {
      navigate('/');
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Barra Superior */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-Do List Advanced
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          
       
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Avatar 
              src={fotoUsuario} 
              sx={{ width: 80, height: 80, mb: 2 }} 
            />
            <Typography variant="subtitle1" fontWeight="bold">
              {nomeUsuario}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {emailUsuario}
            </Typography>
          </Box>
          
          <Divider />

          {/* Links de Navegação */}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/tasks')}>
                <ListItemIcon>
                  <AssignmentIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Lista de Tarefas" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/profile')}>
                <ListItemIcon>
                  <PersonIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Meu Perfil" />
              </ListItemButton>
            </ListItem>
          </List>
          
        </Box>
      </Drawer>

   
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f0f2f5' }}>
        {children}
      </Box>

    </Box>
  );
};