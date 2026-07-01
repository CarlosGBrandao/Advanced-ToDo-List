import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Box, TextField, Button, Typography } from '@mui/material';


import { EnviarImagem } from '../components/EnviarImagem';
import { Seletor } from '../components/Seletor';

export const UserProfile = () => {
  const user = useTracker(() => Meteor.user());

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fotoBase64, setFotoBase64] = useState('');


  const opcoesSexo = [
    'Masculino', 
    'Feminino', 
    'Outro', 
    'Prefiro não informar'
  ];

  useEffect(() => {
    if (user?.profile) {
      setNome(user.profile.nome || '');
      setEmail(user.profile.email || '');
      setDataNascimento(user.profile.dataNascimento || '');
      setSexo(user.profile.sexo || '');
      setEmpresa(user.profile.empresa || '');
      setFotoBase64(user.profile.fotoBase64 || '');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { nome, email, dataNascimento, sexo, empresa, fotoBase64 };

    Meteor.call('users.updateProfile', profileData, (error) => {
      if (error) alert('Erro ao atualizar perfil: ' + error.reason);
      else alert('Perfil atualizado com sucesso!');
    });
  };

  return (
    <Box sx={{ p: 4, flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Meu Perfil
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        
        
        <EnviarImagem 
          currentImage={fotoBase64} 
          onImageChange={setFotoBase64} 
        />

        <TextField 
          label="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          required fullWidth 
        />

        <TextField 
          label="E-mail" type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required fullWidth 
        />

        <TextField 
          label="Data de Nascimento" type="date" 
          value={dataNascimento} 
          onChange={(e) => setDataNascimento(e.target.value)} 
          InputLabelProps={{ shrink: true }}
          required fullWidth 
        />

      
        <Seletor
          label="Sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          options={opcoesSexo}
          required
        />

        <TextField 
          label="Empresa" 
          value={empresa} 
          onChange={(e) => setEmpresa(e.target.value)} 
          fullWidth 
        />

        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Salvar Dados
        </Button>
      </form>
    </Box>
  );
};