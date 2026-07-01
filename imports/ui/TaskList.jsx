import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import { IconButton, CircularProgress, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Lista } from '../components/Lista.jsx';

import { Tasks } from 'imports/api/TasksCollection';

export const TaskList = () => {

    const navigate = useNavigate();

    const currentUser = useTracker(() => Meteor.user());

  const { tasks, isLoading } = useTracker(() => {
    const subscription = Meteor.subscribe('tasks.all');
    
    return {
      isLoading: !subscription.ready(), // true enquanto os dados não chegam do servidor
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch() // Busca as tarefas ordenadas pelas mais recentes
    };
  });

  const handleEdit = (tarefa) => {

    navigate(`/tasks/${tarefa._id}`);
  };

  const handleDelete = (tarefa) => {
    if (window.confirm(`Tem certeza que deseja excluir a tarefa: ${tarefa.nome}?`)) {
       Meteor.call('tasks.remove', tarefa._id); 
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }



  return (
    <Lista
      title="Tarefas Cadastradas"
      items={tasks}
      icon={<AssignmentIcon color="primary" />}
      primaryExtractor={(tarefa) => tarefa.nome}
      secondaryExtractor={(tarefa) => `Criada por: ${tarefa.criador} ${tarefa.isPersonal ? '(Pessoal)' : ''}`}
      
      renderActions={(tarefa) => {
    
        if (!currentUser || currentUser._id !== tarefa.ownerId) {
          return null; 
        }

        return (
          <>
            <IconButton edge="end" onClick={() => handleEdit(tarefa)} style={{ marginRight: '8px' }}>
              <EditIcon color="action" />
            </IconButton>
            <IconButton edge="end" onClick={() => handleDelete(tarefa)}>
              <DeleteIcon color="error" />
            </IconButton>
          </>
        );
      }}
    />
  );

};