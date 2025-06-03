
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SalesLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const SalesLoginModal = ({ isOpen, onClose, onLoginSuccess }: SalesLoginModalProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verificar credenciais
    if (email === 'oatvio@gmail.com' && password === '123') {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao sistema de vendas WXsoftware.",
        });
        onLoginSuccess();
        onClose();
        setEmail('');
        setPassword('');
      }, 1000);
    } else {
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }, 1000);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-dark-blue border-neon-green/30">
        <DialogHeader>
          <DialogTitle className="text-neon-green text-xl font-bold text-center">
            Login - Sistema de Vendas
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 p-4">
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="pl-10 bg-darker-blue border-neon-green/30 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="text-white">Senha</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="pl-10 bg-darker-blue border-neon-green/30 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-dark-green hover:bg-neon-green hover:text-black text-white"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
            
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="w-full border-neon-green/30 text-white hover:bg-neon-green/10"
            >
              Cancelar
            </Button>
          </div>

          <div className="text-center text-xs text-gray-400 pt-4 border-t border-neon-green/30">
            <p>Credenciais de acesso:</p>
            <p>Email: oatvio@gmail.com</p>
            <p>Senha: 123</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SalesLoginModal;
