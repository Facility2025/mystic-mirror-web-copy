import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginFormCardProps {
  onLogin: (loginData: { email: string; password: string }) => void;
  onRegisterClick: () => void;
}

const LoginFormCard = ({ onLogin, onRegisterClick }: LoginFormCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <div className="bg-gradient-to-br from-black/95 to-gray-900/95 border border-purple-500/50 rounded-lg p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/912d8eeb-60bb-4d7d-b946-a9dd27ced49e.png" 
              alt="Sistema de Arquivos" 
              className="h-[100px] w-[100px] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-3 filter hover:brightness-110"
              style={{
                animation: 'float 3s ease-in-out infinite'
              }}
            />
          </div>
          <h1 className="text-2xl font-bold text-green-400 mb-2">Sistema de Arquivos</h1>
          <p className="text-gray-400">Faça login para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3"
          >
            Entrar
          </Button>

          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Esqueci minha senha
            </button>
            <p className="text-gray-400 text-sm">
              Não tem uma conta?{' '}
              <button 
                type="button"
                onClick={onRegisterClick}
                className="text-green-400 hover:text-green-300 animate-pulse"
              >
                Cadastre-se
              </button>
            </p>
          </div>

          <div className="border-t border-slate-600 pt-4 text-center text-xs text-gray-500">
            <p>Credenciais de teste:</p>
            <p>Email: admin@teste.com (Admin)</p>
            <p>Email: usuario@teste.com (Usuário)</p>
            <p>Senha: 123456</p>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginFormCard;
