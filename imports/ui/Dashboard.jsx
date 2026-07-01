import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';


import { Typography, Button, CircularProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Metricas } from '../components/Metricas';


import './styles.css';

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
      totalConcluidas: tarefas.filter(t => t.situacao === 'Concluída' || t.situacao === 'Concluídas').length,
    };
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      
      <Typography variant="h4" className="dashboard-title">
        Início
      </Typography>

      
      <div className="dashboard-metrics-grid">
        
        <Metricas 
          title="Total de Tarefas Cadastradas" 
          value={totalCadastradas} 
          color="#2196f3" 
          icon={<AssignmentIcon style={{ color: '#2196f3' }} />}
        />
        
        <Metricas
          title="Total de Tarefas em Andamento" 
          value={totalEmAndamento} 
          color="#ff9800" 
          icon={<PlayArrowIcon style={{ color: '#ff9800' }} />}
        />
        
        <Metricas 
          title="Total de Tarefas Concluídas" 
          value={totalConcluidas} 
          color="#4caf50" 
          icon={<DoneIcon style={{ color: '#4caf50' }} />}
        />

      </div>

      <div className="dashboard-actions">
        <Button 
          variant="contained" 
          color="primary" 
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate('/tasks')}
          className="dashboard-btn-large"
        >
          Visualizar Lista de Tarefas
        </Button>
      </div>
      
    </div>
  );
};