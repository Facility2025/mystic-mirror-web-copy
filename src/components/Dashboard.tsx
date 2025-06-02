
import React from 'react';
import { Upload, LogOut, FileVideo, FileText, FileImage, Settings, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileCard from './FileCard';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const files = [
    {
      id: '01',
      name: 'Arquivo 01',
      description: 'Descrição do arquivo 1',
      date: '29/05/2025',
      type: 'VIDEO' as const,
      icon: <FileVideo className="h-8 w-8 text-red-500" />
    },
    {
      id: '02',
      name: 'Arquivo 02',
      description: '',
      date: '18/02/2025',
      type: 'VIDEO' as const,
      icon: <FileVideo className="h-8 w-8 text-red-500" />
    },
    {
      id: '03',
      name: 'Arquivo 03',
      description: '',
      date: '03/03/2025',
      type: 'TEXT' as const,
      icon: <FileText className="h-8 w-8 text-green-500" />
    },
    {
      id: '04',
      name: 'Arquivo 04',
      description: 'Descrição do arquivo 4',
      date: '03/04/2025',
      type: 'PDF' as const,
      icon: <FileImage className="h-8 w-8 text-blue-500" />
    },
    {
      id: '05',
      name: 'Arquivo 05',
      description: '',
      date: '09/04/2025',
      type: 'AI' as const,
      icon: <Settings className="h-8 w-8 text-purple-500" />
    },
    {
      id: '06',
      name: 'Arquivo 06',
      description: '',
      date: '21/04/2025',
      type: 'VPS' as const,
      icon: <Database className="h-8 w-8 text-orange-500" />
    },
    {
      id: '07',
      name: 'Arquivo 07',
      description: 'Descrição do arquivo 7',
      date: '09/05/2025',
      type: 'VIDEO' as const,
      icon: <FileVideo className="h-8 w-8 text-red-500" />
    },
    {
      id: '08',
      name: 'Arquivo 08',
      description: '',
      date: '11/02/2025',
      type: 'VIDEO' as const,
      icon: <FileVideo className="h-8 w-8 text-red-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-purple-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-green-400 text-xl font-bold">Meus Arquivos e Acesso da Web</h1>
          <Button 
            onClick={onLogout}
            variant="destructive" 
            className="bg-red-500 hover:bg-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
            <Upload className="h-4 w-4 mr-2" />
            Enviar Arquivos
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-semibold">Página 1 de 2</h2>
          <p className="text-gray-400">Exibindo 1-30 de 45 arquivos</p>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <FileCard
              key={file.id}
              id={file.id}
              name={file.name}
              description={file.description}
              date={file.date}
              type={file.type}
              icon={file.icon}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
