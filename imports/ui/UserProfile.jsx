import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Button, Typography } from '@mui/material';

import { EnviarImagem } from '../components/EnviarImagem';
import { Seletor } from '../components/Seletor';
import { CampoTexto } from '../components/CampoTexto';
import './styles.css';

export const UserProfile = () => {
  const user = useTracker(() => Meteor.user());

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fotoBase64, setFotoBase64] = useState('');

  const opcoesSexo = ['Masculino', 'Feminino', 'Outro'];

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
    <div className="profile-container">
      <Typography variant="h4" className="profile-title">
        Meu Perfil
      </Typography>

      <form onSubmit={handleSubmit} className="profile-form">
        
        <EnviarImagem 
          currentImage={fotoBase64} 
          onImageChange={setFotoBase64} 
        />

      
        <CampoTexto label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} isEditing={true} required />
        <CampoTexto label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} isEditing={true} required />
        <CampoTexto label="Data de Nascimento" type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} isEditing={true} required />
        
        <Seletor
          label="Sexo"
          value={sexo}
          onChange={(e) => setSexo(e.target.value)}
          options={opcoesSexo}
          required
        />

        <CampoTexto label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} isEditing={true} />

        <Button type="submit" variant="contained" color="primary" size="large" className="profile-submit-btn">
          Salvar Dados
        </Button>
      </form>
    </div>
  );
};