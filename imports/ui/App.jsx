import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  const [showLogin, setShowLogin] = useState(true);

  if (!user) {
    return (
      <div className="auth-container">
        
        {showLogin ? <LoginForm /> : <RegisterForm />}
        
        
        <button onClick={() => setShowLogin(!showLogin)} style={{ marginTop: '15px' }}>
          {showLogin ? 'Cadastrar' : 'Fazer Login'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Bem-vindo ao ToDo List</h1>
      <button onClick={() => Meteor.logout()}>Sair</button>
    </div>
  );
};