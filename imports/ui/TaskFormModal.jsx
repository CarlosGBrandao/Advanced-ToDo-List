import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  FormControlLabel, 
  Checkbox,
  Box
} from '@mui/material';

import { CampoTexto } from '../components/CampoTexto'; 
import './styles.css';

export const TaskFormModal = ({ open, handleClose }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataLimit, setDataLimit] = useState('');
  const [hora, setHora] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setDataLimit('');
    setIsPersonal(false);
    setHora('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { nome, descricao, dataLimit, hora, isPersonal };

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
      <DialogTitle className="custom-dialog-title">Nova Tarefa</DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          
          <div className="modal-form-content">
            <CampoTexto 
              label="Nome da Tarefa" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              isEditing={true} 
              required 
            />

            <CampoTexto 
              label="Descrição" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              isEditing={true} 
              multiline 
              rows={3} 
            />

            <div className="form-row">
  <div className="form-col">
    <CampoTexto 
      label="Data Limite" 
      type="date" 
      value={dataLimit} 
      onChange={(e) => setDataLimit(e.target.value)} 
      isEditing={true} 
    />
  </div>
  <div className="form-col">
    <CampoTexto 
      label="Hora" 
      type="time" 
      value={hora} 
      onChange={(e) => setHora(e.target.value)} 
      isEditing={true}
      InputLabelProps={{ shrink: true }} 
    />
  </div>
</div>

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
          </div>

        </DialogContent>

        <DialogActions className="custom-dialog-actions">
          <Button onClick={handleClose} color="inherit">
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="modal-submit-btn"
          >
            Cadastrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );

};