
import React, { useState } from 'react';
import { Upload, LogOut, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileCard from './FileCard';
import FileUploadForm from './FileUploadForm';
import NeuralBackground from './NeuralBackground';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [isUploadFormOpen, setIsUploadFormOpen] = useState(false);
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

  const handleFileUpload = (fileData: { name: string; description: string; file: File | null; fileUrl: string; fileType: string; isLink?: boolean }) => {
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
      isLink: fileData.isLink
    };

    console.log('Arquivo criado:', newFile);

    // Adicionar novo arquivo no início da lista para mostrar os mais recentes primeiro
    setFiles([newFile, ...files]);
    console.log('Lista de arquivos atualizada');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black relative overflow-hidden">
      <NeuralBackground />

      {/* Header */}
      <header className="bg-gradient-to-br from-black/95 to-gray-900/95 backdrop-blur-md border-b border-purple-500/50 px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Meus Arquivos e Acesso da Web</h1>
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
      <main className="p-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={() => setIsUploadFormOpen(true)}
            className="bg-black hover:bg-gray-900 text-white font-semibold transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300"
          >
            <Upload className="h-4 w-4 mr-2" />
            Enviar Arquivos
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-semibold">Página 1 de 2</h2>
          <p className="text-gray-300">Exibindo 1-30 de {files.length + 37} arquivos</p>
        </div>

        {/* Files Grid - Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {files.map((file, index) => (
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
              />
            </div>
          ))}
        </div>
      </main>

      {/* Upload Form Modal */}
      <FileUploadForm
        isOpen={isUploadFormOpen}
        onClose={() => setIsUploadFormOpen(false)}
        onSubmit={handleFileUpload}
      />
    </div>
  );
};

export default Dashboard;
