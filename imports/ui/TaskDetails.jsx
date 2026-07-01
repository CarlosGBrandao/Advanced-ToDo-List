import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '/imports/api/TasksCollection';


import { Button, Typography, CircularProgress } from '@mui/material';

import { Seletor } from '../components/Seletor';
import { CampoTexto } from '../components/CampoTexto';
import { MaquinaEstados } from '../components/MaquinaEstados';


import './styles.css';

export const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [situacao, setSituacao] = useState('');
  const [dataLimit, setDataLimit] = useState('');
  const [hora, setHora] = useState('');
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
      setHora(task.hora || '');
      setCriador(task.criador || '');
    }
  }, [task, isEditing]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }
  
  if (!task) return (
    <div style={{ padding: '32px' }}>
      <Typography color="error">Tarefa não encontrada.</Typography>
      <Button onClick={() => navigate('/tasks')} variant="contained" style={{ marginTop: '16px' }}>Voltar</Button>
    </div>
  );

  const isOwner = Meteor.userId() === task.ownerId;

  const handleMudarStatus = (novoStatus) => {
    Meteor.call('tasks.updateStatus', taskId, novoStatus, (error) => {
      if (error) alert(error.reason);
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    Meteor.call('tasks.update', taskId, { nome, descricao, situacao, dataLimit, hora }, (error) => {
      if (error) alert(error.reason);
      else {
        setIsEditing(false);
        alert('Tarefa atualizada.');
      }
    });
  };

  return (
    <div className="task-details-container">
      <div className="task-details-paper">
        
        <div className="task-details-header">
          <Typography variant="h4">
            {isEditing ? 'Editar Tarefa' : 'Visualizar Tarefa'}
          </Typography>
          {!isEditing && isOwner && (
            <Button variant="contained" color="secondary" onClick={() => setIsEditing(true)}>
              Editar Dados
            </Button>
          )}
        </div>

        <form onSubmit={handleSave} className="task-form">
          
          <CampoTexto label="Nome da Tarefa" value={nome} onChange={(e) => setNome(e.target.value)} isEditing={isEditing} required />
          <CampoTexto label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} isEditing={isEditing} multiline rows={3} />
          
          {isEditing ? (
            <Seletor label="Situação" value={situacao} onChange={(e) => setSituacao(e.target.value)} options={['Cadastrada', 'Em Andamento', 'Concluída']} required />
          ) : (
            <CampoTexto label="Situação Atual" value={situacao} isEditing={false} />
          )}

          <div className="form-row">
  <div className="form-col">
    <CampoTexto 
      label="Data Limite" 
      type="date" 
      value={dataLimit} 
      onChange={(e) => setDataLimit(e.target.value)} 
      isEditing={isEditing} 
    />
  </div>
  <div className="form-col">
    <CampoTexto 
      label="Hora" 
      type="time" 
      value={hora} 
      onChange={(e) => setHora(e.target.value)} 
      isEditing={isEditing} 
      InputLabelProps={{ shrink: true }} 
    />
  </div>
</div>
          
          <CampoTexto label="Criado por" value={criador} isEditing={false} />

          {isEditing ? (
            <div className="task-form-actions">
              <Button type="submit" variant="contained" color="primary">Salvar Alterações</Button>
              <Button variant="outlined" color="inherit" onClick={() => setIsEditing(false)}>Cancelar</Button>
            </div>
          ) : (
            isOwner && <MaquinaEstados situacaoAtual={situacao} onMudarStatus={handleMudarStatus} />
          )}

          <Button 
            variant="text" 
            color="inherit" 
            onClick={() => navigate('/tasks')} 
            className="btn-voltar-lista"
          >
            ← Voltar para a Lista
          </Button>

        </form>
      </div>
    </div>
  );
};