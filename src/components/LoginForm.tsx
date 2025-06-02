
import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RegisterForm from './RegisterForm';

interface LoginFormProps {
  onLogin: () => void;
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createPoints = () => {
      const points: Point[] = [];
      const numPoints = 50;
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        });
      }
      
      pointsRef.current = points;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const points = pointsRef.current;
      const mouse = mouseRef.current;

      // Atualizar posições dos pontos
      points.forEach(point => {
        // Movimento natural
        point.x += point.vx;
        point.y += point.vy;

        // Atração ao mouse
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          point.vx += dx * force * 0.001;
          point.vy += dy * force * 0.001;
        }

        // Manter velocidade controlada
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > 1) {
          point.vx = (point.vx / speed) * 1;
          point.vy = (point.vy / speed) * 1;
        }

        // Rebater nas bordas
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
      });

      // Desenhar conexões
      ctx.strokeStyle = 'rgba(173, 216, 230, 0.3)'; // Azul bebê
      ctx.lineWidth = 1;
      
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100;
            ctx.strokeStyle = `rgba(173, 216, 230, ${opacity * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Desenhar pontos
      ctx.fillStyle = 'rgba(173, 216, 230, 0.8)';
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Conexão com o mouse
      ctx.strokeStyle = 'rgba(173, 216, 230, 0.6)';
      ctx.lineWidth = 2;
      points.forEach(point => {
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          const opacity = (120 - distance) / 120;
          ctx.strokeStyle = `rgba(173, 216, 230, ${opacity * 0.8})`;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    createPoints();
    window.addEventListener('resize', () => {
      resizeCanvas();
      createPoints();
    });
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleRegister = (userData: { name: string; email: string; password: string }) => {
    console.log('Usuário registrado:', userData);
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Canvas para efeito neural */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Container flutuante */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-gradient-to-br from-black/90 to-purple-900/80 border border-purple-500 rounded-lg p-8 shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
          <div className="text-center mb-8">
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
                  onClick={() => setIsRegisterOpen(true)}
                  className="text-green-400 hover:text-green-300"
                >
                  Cadastre-se
                </button>
              </p>
            </div>

            <div className="border-t border-slate-600 pt-4 text-center text-xs text-gray-500">
              <p>Credenciais de teste:</p>
              <p>Email: admin@teste.com</p>
              <p>Senha: 123456</p>
            </div>
          </form>
        </div>
      </div>

      <RegisterForm
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegister={handleRegister}
      />
    </div>
  );
};

export default LoginForm;
