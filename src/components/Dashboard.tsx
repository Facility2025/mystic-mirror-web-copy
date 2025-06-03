import React, { useState } from 'react';
import { Upload, LogOut, File, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FileCard from './FileCard';
import FileUploadForm from './FileUploadForm';
import NeuralBackground from './NeuralBackground';
import PWAInstallPrompt from './PWAInstallPrompt';

interface UserData {
  email: string;
  role: 'admin' | 'usuario';
}

interface DashboardProps {
  onLogout: () => void;
  userData: UserData | null;
}

const Dashboard = ({ onLogout, userData }: DashboardProps) => {
  // Usar dados do usuário passados como prop ou dados padrão como fallback
  const currentUser = userData || {
    email: 'usuario@example.com',
    role: 'usuario' as const
  };

  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([
    {
      id: '01',
      name: 'Arquivo 01',
      description: 'Descrição do arquivo 1',
      date: '29/05/2025',
      type: 'VIDEO' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '02',
      name: 'Arquivo 02',
      description: '',
      date: '18/02/2025',
      type: 'VIDEO' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '03',
      name: 'Arquivo 03',
      description: '',
      date: '03/03/2025',
      type: 'TEXT' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '04',
      name: 'Arquivo 04',
      description: 'Descrição do arquivo 4',
      date: '03/04/2025',
      type: 'PDF' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '05',
      name: 'Arquivo 05',
      description: '',
      date: '09/04/2025',
      type: 'AI' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '06',
      name: 'Arquivo 06',
      description: '',
      date: '21/04/2025',
      type: 'VPS' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '07',
      name: 'Arquivo 07',
      description: 'Descrição do arquivo 7',
      date: '09/05/2025',
      type: 'VIDEO' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    },
    {
      id: '08',
      name: 'Arquivo 08',
      description: '',
      date: '11/02/2025',
      type: 'VIDEO' as const,
      icon: <File className="h-8 w-8 text-gray-400" />
    }
  ]);

  const getFileTypeFromData = (fileData: { name: string; file: File | null; fileUrl: string; fileType: string; isLink?: boolean }) => {
    console.log('Processando arquivo:', fileData);
    
    if (fileData.isLink) {
      // Para links, tentamos determinar o tipo pela URL
      const url = fileData.fileUrl.toLowerCase();
      if (url.includes('.mp4') || url.includes('.avi') || url.includes('.mov') || url.includes('youtube.com') || url.includes('vimeo.com')) {
        return 'VIDEO' as const;
      } else if (url.includes('.pdf')) {
        return 'PDF' as const;
      } else if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp') || url.includes('.svg')) {
        return 'PDF' as const; // Usando PDF para imagens para manter compatibilidade
      } else if (url.includes('.txt') || url.includes('.doc') || url.includes('.docx')) {
        return 'TEXT' as const;
      } else {
        return 'AI' as const;
      }
    } else if (fileData.file) {
      // Para arquivos, usamos o tipo MIME
      const mimeType = fileData.fileType;
      console.log('Tipo MIME do arquivo:', mimeType);
      
      if (mimeType.startsWith('image/')) {
        return 'PDF' as const; // Usando PDF para imagens para manter compatibilidade
      } else if (mimeType === 'application/pdf') {
        return 'PDF' as const;
      } else if (mimeType.startsWith('text/') || mimeType.includes('document') || mimeType.includes('word')) {
        return 'TEXT' as const;
      } else if (mimeType.startsWith('video/')) {
        return 'VIDEO' as const;
      } else {
        return 'AI' as const;
      }
    } else {
      return 'AI' as const;
    }
  };

  const handleFileUpload = (fileData: { name: string; description: string; file: File | null; fileUrl: string; fileType: string; isLink?: boolean; previewImage?: string }) => {
    console.log('Recebendo arquivo para upload:', fileData);
    
    const type = getFileTypeFromData(fileData);

    // Gerar novo ID baseado no próximo número disponível
    const nextNumber = files.length + 1;
    const newId = String(nextNumber).padStart(2, '0');
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    const newFile = {
      id: newId,
      name: fileData.name,
      description: fileData.description,
      date: currentDate,
      type: type,
      icon: <File className="h-8 w-8 text-gray-400" />,
      fileUrl: fileData.fileUrl,
      fileType: fileData.fileType,
      isLink: fileData.isLink,
      previewImage: fileData.previewImage
    };

    console.log('Arquivo criado:', newFile);

    // Adicionar novo arquivo no início da lista para mostrar os mais recentes primeiro
    setFiles([newFile, ...files]);
    console.log('Lista de arquivos atualizada');
  };

  const handleFileUpdate = (fileId: string, newName: string, newDescription: string) => {
    setFiles(prevFiles => 
      prevFiles.map(file => 
        file.id === fileId 
          ? { ...file, name: newName, description: newDescription }
          : file
      )
    );
  };

  // Filtrar arquivos baseado no termo de busca
  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <NeuralBackground />

      {/* Header */}
      <header className="bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-md border-b border-purple-500/50 px-4 sm:px-6 py-4 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/3aff111f-532c-4981-9574-0b45374b5d87.png" 
              alt="Sistema de Arquivos" 
              className="h-8 w-8 rounded-lg"
            />
            <h1 className="text-white text-lg sm:text-xl font-bold">Sistema de Arquivos</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex items-center space-x-2 text-white text-sm">
              <User className="h-4 w-4" />
              <span>
                <span className="font-semibold text-green-400">
                  {currentUser.role === 'admin' ? 'Admin' : 'Usuário'}
                </span>
                {' - '}
                <span className="text-gray-300 break-all">{currentUser.email}</span>
              </span>
            </div>
            <Button 
              onClick={onLogout}
              variant="destructive" 
              size="sm"
              className="bg-red-500 hover:bg-red-600 w-full sm:w-auto"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border border-white/80 rounded-lg p-4 shadow-[0_0_15px_rgba(255,255,255,0.3)] bg-black/20 backdrop-blur-sm">
          <Button 
            onClick={() => setIsUploadFormOpen(true)}
            className="bg-black hover:bg-gray-900 text-white font-semibold transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 w-full sm:w-auto"
          >
            <Upload className="h-4 w-4 mr-2" />
            Enviar Arquivos
          </Button>
          
          {/* Barra de Busca */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-purple-500/50 text-white placeholder-gray-400 focus:border-purple-400"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <h2 className="text-white text-lg font-semibold">Página 1 de 2</h2>
          <p className="text-gray-300 text-sm">Exibindo 1-30 de {filteredFiles.length + 37} arquivos</p>
        </div>

        {/* Files Grid - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {filteredFiles.map((file, index) => (
            <div 
              key={file.id}
              className="transform hover:scale-105 hover:translate-y-[-8px] transition-all duration-300 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <FileCard
                id={file.id}
                name={file.name}
                description={file.description}
                date={file.date}
                type={file.type}
                icon={file.icon}
                fileUrl={(file as any).fileUrl}
                fileType={(file as any).fileType}
                isLink={(file as any).isLink}
                previewImage={(file as any).previewImage}
                onUpdate={handleFileUpdate}
              />
            </div>
          ))}
        </div>

        {/* Mensagem quando nenhum arquivo é encontrado */}
        {filteredFiles.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhum arquivo encontrado para "{searchTerm}"</p>
          </div>
        )}
      </main>

      {/* Upload Form Modal */}
      <FileUploadForm
        isOpen={isUploadFormOpen}
        onClose={() => setIsUploadFormOpen(false)}
        onSubmit={handleFileUpload}
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  );
};

export default Dashboard;
