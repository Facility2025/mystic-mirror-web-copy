
import React, { useState } from 'react';
import NeuralBackground from './NeuralBackground';
import LoginFormCard from './LoginFormCard';
import RegisterForm from './RegisterForm';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleRegister = (userData: { name: string; email: string; password: string }) => {
    console.log('Usuário registrado:', userData);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      <NeuralBackground />
      
      <LoginFormCard 
        onLogin={onLogin}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default LoginForm;
