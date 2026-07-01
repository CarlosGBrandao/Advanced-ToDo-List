import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Box 
} from '@mui/material';

export const TaskFormModal = ({ open, handleClose }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataLimit, setDataLimit] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setDataLimit('');
    setIsPersonal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = { nome, descricao, dataLimit, isPersonal };

    Meteor.call('tasks.insert', taskData, (error) => {
      if (error) {
        alert('Erro ao cadastrar tarefa: ' + error.reason);
      } else {
        resetForm();
        handleClose(); 
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Nova Tarefa</DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap="20px">
            
            <TextField
              label="Nome da Tarefa"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              label="Data Limite"
              type="date"
              value={dataLimit}
              onChange={(e) => setDataLimit(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

         
            <FormControlLabel
              control={
                <Checkbox 
                  checked={isPersonal} 
                  onChange={(e) => setIsPersonal(e.target.checked)} 
                  color="primary"
                />
              }
              label="Esta é uma tarefa pessoal?"
            />

          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};