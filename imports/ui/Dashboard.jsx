import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Olá, seja bem-vindo ao Todo List!</h1>
      <p>Aqui futuramente ficarão os cards de resumo das tarefas.</p>
      
     
      <Link to="/tasks" style={{ display: 'block', margin: '20px 0' }}>
        Ir para a Lista de Tarefas
      </Link>
      
      <button onClick={() => Meteor.logout()}>Sair do Sistema</button>
    </div>
  );
};