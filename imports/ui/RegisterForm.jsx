import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';


import { CampoTexto } from '../components/CampoTexto';
import { Seletor } from '../components/Seletor';
import { EnviarImagem } from '../components/EnviarImagem';
import './styles.css';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '500px', 
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh', 
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
}));

export const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();

  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [sexo, setSexo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [fotoBase64, setFotoBase64] = useState('');

  const opcoesSexo = ['Masculino', 'Feminino', 'Outro'];

  const handleSubmit = (event) => {
    event.preventDefault();

    
    const userPayload = {
      username: username,
      password: password,
      email: email, 
      profile: {
        nome,
        email,
        dataNascimento,
        sexo,
        empresa,
        fotoBase64
      }
    };

    Accounts.createUser(userPayload, (error) => {
      if (error) {
        alert("Erro ao criar conta: " + error.reason);
      } else {
        alert("Conta criada com sucesso!");
        navigate('/'); 
      }
    });
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" sx={{ justifyContent: 'center' }}>
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(1.8rem, 10vw, 2.15rem)', fontWeight: 'bold' }}
          >
            Criar Conta
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
           
            <div className="auth-form-scrollable">
              
              
              <FormControl>
                <FormLabel sx={{ mb: 1 }}>Foto de Perfil</FormLabel>
                <EnviarImagem 
                  currentImage={fotoBase64} 
                  onImageChange={setFotoBase64} 
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="username">Usuário</FormLabel>
                <CampoTexto
                  name="username"
                  required
                  id="username"
                  placeholder="Seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isEditing={true}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel htmlFor="password">Senha</FormLabel>
                <CampoTexto
                  required
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isEditing={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="nome">Nome Completo</FormLabel>
                <CampoTexto
                  required
                  name="nome"
                  id="nome"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  isEditing={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <CampoTexto
                  required
                  name="email"
                  type="email"
                  id="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isEditing={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="dataNascimento">Data de Nascimento</FormLabel>
                <CampoTexto
                  required
                  name="dataNascimento"
                  type="date"
                  id="dataNascimento"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                  isEditing={true}
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={{ mb: 0.5 }}>Sexo</FormLabel>
                <Seletor
                  label="Selecione o sexo"
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  options={opcoesSexo}
                  required
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="empresa">Empresa</FormLabel>
                <CampoTexto
                  name="empresa"
                  id="empresa"
                  placeholder="Empresa onde trabalha"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  isEditing={true}
                />
              </FormControl>
              
            </div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
            >
              Cadastrar
            </Button>
          </Box>
          
          <Divider sx={{ my: 1 }}>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Possui uma conta?{' '}
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate('/login')} 
                sx={{ alignSelf: 'center', fontWeight: 'bold' }}
              >
                Faça Login
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
};