
import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

interface UserData {
  email: string;
  role: 'admin' | 'usuario';
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLogin = (loginData: { email: string; password: string }) => {
    // Determinar o papel baseado no email ou senha
    // Para demonstração, vamos usar o email para determinar se é admin
    const role = loginData.email === 'admin@teste.com' ? 'admin' : 'usuario';
    
    const user: UserData = {
      email: loginData.email,
      role: role
    };
    
    setUserData(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} userData={userData} />
      )}
    </>
  );
};

export default Index;
