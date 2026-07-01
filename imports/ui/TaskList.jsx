import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import { IconButton, CircularProgress, Box, Button } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Lista } from '../components/Lista.jsx';

import { Tasks } from 'imports/api/TasksCollection';
import { TaskFormModal } from './TaskFormModal';

export const TaskList = () => {

    const navigate = useNavigate();

    const currentUser = useTracker(() => Meteor.user());

    const [modalOpen, setModalOpen] = useState(false);

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
    <Box sx={{ p: 2, maxWidth: '600px', margin: '0 auto' }}>
      
    
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Nova Tarefa
        </Button>
      </Box>

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

      {/* Instanciação do componente modal */}
      <TaskFormModal 
        open={modalOpen} 
        handleClose={() => setModalOpen(false)} 
      />

    </Box>
  );

};