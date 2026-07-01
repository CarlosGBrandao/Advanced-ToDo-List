import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'; 
import { ReactiveVar } from 'meteor/reactive-var';

import { 
  IconButton, 
  CircularProgress, 
  Button, 
  FormControlLabel, 
  Checkbox 
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add'; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Lista } from '../components/Lista.jsx';
import { CampoTexto } from '../components/CampoTexto.jsx';
import { Tasks } from '/imports/api/TasksCollection'; 
import { TaskFormModal } from './TaskFormModal'; 
import './styles.css';


const showCompletedVar = new ReactiveVar(false);
const searchQueryVar = new ReactiveVar('');
const currentPageVar = new ReactiveVar(1);

export const TaskList = () => {

  const navigate = useNavigate();
  const currentUser = useTracker(() => Meteor.user());
  const [modalOpen, setModalOpen] = useState(false);
  

  const showCompleted = useTracker(() => showCompletedVar.get());
  const searchQuery = useTracker(() => searchQueryVar.get());
  const currentPage = useTracker(() => currentPageVar.get());




  useEffect(() => {
    currentPageVar.set(1);
  }, [showCompleted, searchQuery]);

 
const { tasks, isLoading } = useTracker(() => {
  
    const subscription = Meteor.subscribe('tasks.all', showCompleted, searchQuery, currentPage);
    
    return {
      isLoading: !subscription.ready(),
     
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
    };
  }, [showCompleted, searchQuery, currentPage]);

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
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  const hasNextPage = tasks.length === 4;

 return (
    <div className="task-list-container">
      
      <div className="task-list-actions">
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>
        
      
        <div className="search-container">
          <CampoTexto 
            label="Pesquisar tarefas por nome..."
            value={searchQuery}
            onChange={(e) => searchQueryVar.set(e.target.value)}
            isEditing={true}
          />
        </div>

        <FormControlLabel
          control={
            <Checkbox 
              checked={showCompleted} 
              onChange={(e) => showCompletedVar.set(e.target.checked)} 
            />
          }
          label="Exibir tarefas concluídas"
          className="checkbox-label"
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          Nova Tarefa
        </Button>
      </div>

      <Lista
        title="Tarefas Cadastradas"
        items={tasks}
        icon={<AssignmentIcon color="primary" />}
        primaryExtractor={(tarefa) => tarefa.hora ? `${tarefa.hora} - ${tarefa.nome}` : tarefa.nome}
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

      <div className="pagination-container">
        <Button 
          variant="outlined" 
          disabled={currentPage === 1} 
          onClick={() => currentPageVar.set(currentPage - 1)}
        >
          Anterior
        </Button>
        
        <span className="pagination-text">Página {currentPage}</span>
        
        <Button 
          variant="outlined" 
          disabled={!hasNextPage} 
          onClick={() => currentPageVar.set(currentPage + 1)}
        >
          Próxima
        </Button>
      </div>

      <TaskFormModal 
        open={modalOpen} 
        handleClose={() => setModalOpen(false)} 
      />

    </div>
  );

};