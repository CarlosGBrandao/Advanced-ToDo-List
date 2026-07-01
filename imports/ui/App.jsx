import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';


import { MainLayout } from './MainLayout';
import { Dashboard } from './Dashboard';
import { TaskList } from './TaskList';
import { UserProfile } from './UserProfile';
import { TaskDetails } from './TaskDetails';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export const App = () => {

  const user = useTracker(() => Meteor.user());
  const loggingIn = useTracker(() => Meteor.loggingIn());


  if (loggingIn) {
    return null; 
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <BrowserRouter>
        {user ? (
       
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/tasks/:taskId" element={<TaskDetails />} />
              
           
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </MainLayout>
        ) : (
    
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            
        
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </LocalizationProvider>
  );
};