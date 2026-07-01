import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';

import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


import { Metricas } from '../components/Metricas';

export const Dashboard = () => {
  const navigate = useNavigate();

 
  const { totalCadastradas, totalEmAndamento, totalConcluidas, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('tasks.all');
    const ready = subscription.ready();

    if (!ready) {
      return { isLoading: true };
    }

 
    const tarefas = Tasks.find({}).fetch();

    return {
      isLoading: false,
      totalCadastradas: tarefas.filter(t => t.situacao === 'Cadastrada').length,
      totalEmAndamento: tarefas.filter(t => t.situacao === 'Em Andamento').length,
      // Suporta variações de escrita de status de forma segura
      totalConcluidas: tarefas.filter(t => t.situacao === 'Concluída' || t.situacao === 'Concluídas').length,
    };
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2, flexGrow: 1 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: '#333' }}>
        Início
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        
        <Grid item xs={12} sm={4}>
          <Metricas 
            title="Total de Tarefas Cadastradas" 
            value={totalCadastradas} 
            color="#2196f3" 
            icon={<AssignmentIcon sx={{ color: '#2196f3' }} />}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Metricas
            title="Total de Tarefas em Andamento" 
            value={totalEmAndamento} 
            color="#ff9800" 
            icon={<PlayArrowIcon sx={{ color: '#ff9800' }} />}
          />
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Metricas 
            title="Total de Tarefas Concluídas" 
            value={totalConcluidas} 
            color="#4caf50" 
            icon={<DoneIcon sx={{ color: '#4caf50' }} />}
          />
        </Grid>

      </Grid>

    
      <Box display="flex" justifyContent="flex-start">
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/tasks')}
          sx={{ padding: '12px 24px', fontWeight: 'bold' }}
        >
          Visualizar Lista de Tarefas
        </Button>
      </Box>
    </Box>
  );
};