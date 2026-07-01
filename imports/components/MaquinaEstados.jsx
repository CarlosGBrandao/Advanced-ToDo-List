import React from 'react';
import { Box, Typography, ButtonGroup, Button } from '@mui/material';

export const MaquinaEstados = ({ situacaoAtual, onMudarStatus }) => {
  return (
    <Box mt={3}>
      <Typography variant="subtitle2" gutterBottom color="textSecondary">
        Situação:
      </Typography>
      
      <ButtonGroup variant="outlined" fullWidth>
        <Button 
          onClick={() => onMudarStatus('Em Andamento')}
          disabled={situacaoAtual !== 'Cadastrada'}
        >
          Iniciar Trabalho
        </Button>
        
        <Button 
          onClick={() => onMudarStatus('Concluída')}
          disabled={situacaoAtual !== 'Em Andamento'}
        >
          Concluir Tarefa
        </Button>
        
        <Button 
          onClick={() => onMudarStatus('Cadastrada')}
          disabled={situacaoAtual === 'Cadastrada'}
        >
          Reiniciar
        </Button>
      </ButtonGroup>
    </Box>
  );
};