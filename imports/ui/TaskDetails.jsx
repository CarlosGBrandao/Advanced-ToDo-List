import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';

import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';

import { Seletor } from '../components/Seletor';
import { CampoTexto } from '../components/CampoTexto';
import { MaquinaEstados } from '../components/MaquinaEstados';

export const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [situacao, setSituacao] = useState('');
  const [dataLimit, setDataLimit] = useState('');
  const [criador, setCriador] = useState('');

  const { task, isLoading } = useTracker(() => {
  const subscription = Meteor.subscribe('tasks.all');
  return {
    isLoading: !subscription.ready(),
    task: Tasks.findOne(taskId),
  };
}, [taskId]);


  useEffect(() => {
 
  if (task && !isEditing) {
    setNome(task.nome || '');
    setDescricao(task.descricao || '');
    setSituacao(task.situacao || 'Cadastrada');
    setDataLimit(task.dataLimit || '');
    setCriador(task.criador || '');
  }
}, [task, isEditing]);

  if (isLoading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  
  if (!task) return (
    <Box p={4}>
      <Typography color="error">Tarefa não encontrada.</Typography>
      <Button onClick={() => navigate('/tasks')} variant="contained" sx={{ mt: 2 }}>Voltar</Button>
    </Box>
  );

  const isOwner = Meteor.userId() === task.ownerId;

  const handleMudarStatus = (novoStatus) => {
    Meteor.call('tasks.updateStatus', taskId, novoStatus, (error) => {
      if (error) alert(error.reason);
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    Meteor.call('tasks.update', taskId, { nome, descricao, situacao, dataLimit }, (error) => {
      if (error) alert(error.reason);
      else {
        setIsEditing(false);
        alert('Tarefa atualizada.');
      }
    });
  };

  return (
    <Box sx={{ p: 4, flexGrow: 1 }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: '700px' }}>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            {isEditing ? 'Editar Tarefa' : 'Visualizar Tarefa'}
          </Typography>
          {!isEditing && isOwner && (
            <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
              Editar Dados
            </Button>
          )}
        </Box>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <CampoTexto label="Nome da Tarefa" value={nome} onChange={(e) => setNome(e.target.value)} isEditing={isEditing} required />
          <CampoTexto label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} isEditing={isEditing} multiline rows={3} />
          
          {isEditing ? (
            <Seletor label="Situação" value={situacao} onChange={(e) => setSituacao(e.target.value)} options={['Cadastrada', 'Em Andamento', 'Concluída']} required />
          ) : (
            <CampoTexto label="Situação Atual" value={situacao} isEditing={false} />
          )}

          <CampoTexto label="Data Limite" type="date" value={dataLimit} onChange={(e) => setDataLimit(e.target.value)} isEditing={isEditing} />
          
          <CampoTexto label="Criado por" value={criador} isEditing={false} />

          {isEditing ? (
            <Box display="flex" gap={2} mt={2}>
              <Button type="submit" variant="contained" color="primary">Salvar Alterações</Button>
              <Button variant="outlined" color="inherit" onClick={() => setIsEditing(false)}>Cancelar</Button>
            </Box>
          ) : (
            isOwner && <MaquinaEstados situacaoAtual={situacao} onMudarStatus={handleMudarStatus} />
          )}

          <Button variant="text" color="inherit" onClick={() => navigate('/tasks')} sx={{ alignSelf: 'flex-start', mt: 1 }}>
            ← Voltar para a Lista
          </Button>

        </form>
      </Paper>
    </Box>
  );
};