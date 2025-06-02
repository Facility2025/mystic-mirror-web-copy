import React, { useState } from 'react';
import { Upload, LogOut, FileVideo, FileText, FileImage, Settings, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileCard from './FileCard';
import FileUploadForm from './FileUploadForm';

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
  ]);

  const getFileTypeFromExtension = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'mkv':
        return { type: 'VIDEO' as const, icon: <FileVideo className="h-8 w-8 text-red-500" /> };
      case 'txt':
      case 'doc':
      case 'docx':
        return { type: 'TEXT' as const, icon: <FileText className="h-8 w-8 text-green-500" /> };
      case 'pdf':
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return { type: 'PDF' as const, icon: <FileImage className="h-8 w-8 text-blue-500" /> };
      default:
        return { type: 'AI' as const, icon: <Settings className="h-8 w-8 text-purple-500" /> };
    }
  };

  const handleFileUpload = (fileData: { name: string; description: string; file: File | null; fileUrl: string; fileType: string; isLink?: boolean }) => {
    let type, icon;
    
    if (fileData.isLink) {
      // Para links, tentamos determinar o tipo pela URL
      const url = fileData.fileUrl.toLowerCase();
      if (url.includes('.mp4') || url.includes('.avi') || url.includes('.mov') || url.includes('youtube.com') || url.includes('vimeo.com')) {
        type = 'VIDEO' as const;
        icon = <FileVideo className="h-8 w-8 text-red-500" />;
      } else if (url.includes('.pdf')) {
        type = 'PDF' as const;
        icon = <FileImage className="h-8 w-8 text-blue-500" />;
      } else if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif')) {
        type = 'PDF' as const; // Usando PDF para imagens como no código original
        icon = <FileImage className="h-8 w-8 text-blue-500" />;
      } else {
        type = 'AI' as const;
        icon = <Settings className="h-8 w-8 text-purple-500" />;
      }
    } else if (fileData.file) {
      const result = getFileTypeFromExtension(fileData.file.name);
      type = result.type;
      icon = result.icon;
    } else {
      type = 'AI' as const;
      icon = <Settings className="h-8 w-8 text-purple-500" />;
    }

    const newId = String(files.length + 1).padStart(2, '0');
    const currentDate = new Date().toLocaleDateString('pt-BR');
    
    const newFile = {
      id: newId,
      name: fileData.name,
      description: fileData.description,
      date: currentDate,
      type: type,
      icon: icon,
      fileUrl: fileData.fileUrl,
      fileType: fileData.fileType,
      isLink: fileData.isLink
    };

    setFiles([newFile, ...files]);
  };

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
          <Button 
            onClick={() => setIsUploadFormOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold"
          >
            <Upload className="h-4 w-4 mr-2" />
            Enviar Arquivos
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-semibold">Página 1 de 2</h2>
          <p className="text-gray-400">Exibindo 1-30 de {files.length + 37} arquivos</p>
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
              fileUrl={(file as any).fileUrl}
              fileType={(file as any).fileType}
              isLink={(file as any).isLink}
            />
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
