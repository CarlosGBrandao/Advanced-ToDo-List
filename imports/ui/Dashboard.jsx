import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

import { Typography, Button, CircularProgress } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Metricas } from '../components/Metricas';
import './styles.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Criamos estados para guardar os números e o loading
  const [counts, setCounts] = useState({ cadastradas: 0, emAndamento: 0, concluidas: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // useEffect vai rodar 1 vez assim que o Dashboard abrir
  useEffect(() => {
    Meteor.call('tasks.getCounts', (error, result) => {
      if (error) {
        console.error("Erro ao buscar métricas:", error);
        alert("Não foi possível carregar as métricas.");
      } else {
        // Se deu sucesso, atualizamos os números na tela
        setCounts(result);
      }
      setIsLoading(false); // Tiramos o símbolo de carregamento
    });
  }, []); // [] garante que só chame o servidor uma vez ao montar a tela

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
          value={counts.cadastradas} 
          color="#2196f3" 
          icon={<AssignmentIcon style={{ color: '#2196f3' }} />}
        />
        
        <Metricas
          title="Total de Tarefas em Andamento" 
          value={counts.emAndamento} 
          color="#ff9800" 
          icon={<PlayArrowIcon style={{ color: '#ff9800' }} />}
        />
        
        <Metricas 
          title="Total de Tarefas Concluídas" 
          value={counts.concluidas} 
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