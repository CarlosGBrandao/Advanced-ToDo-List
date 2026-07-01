import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { Dashboard } from './Dashboard';
import { TaskList } from './TaskList';
import { UserProfile } from './UserProfile';
import { TaskDetails } from './TaskDetails';
import { MainLayout } from './MainLayout';

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const loggingIn = useTracker(() => Meteor.loggingIn());
  const [showLogin, setShowLogin] = useState(true);

  if (loggingIn) {
    return <div>Carregando...</div>;
  }


  if (!user) {
    return (
      <div className="auth-container">
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <button onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? 'Cadastrar-se' : 'Fazer login'}
        </button>
      </div>
    );
  }

  return (
    <BrowserRouter>
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
      </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};