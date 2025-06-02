import React, { useState } from 'react';
import { Upload, LogOut, File } from 'lucide-react';
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

  const getFileTypeFromExtension = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'mkv':
        return { type: 'VIDEO' as const, icon: <File className="h-8 w-8 text-gray-400" /> };
      case 'txt':
      case 'doc':
      case 'docx':
        return { type: 'TEXT' as const, icon: <File className="h-8 w-8 text-gray-400" /> };
      case 'pdf':
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return { type: 'PDF' as const, icon: <File className="h-8 w-8 text-gray-400" /> };
      default:
        return { type: 'AI' as const, icon: <File className="h-8 w-8 text-gray-400" /> };
    }
  };

  const handleFileUpload = (fileData: { name: string; description: string; file: File | null; fileUrl: string; fileType: string; isLink?: boolean }) => {
    let type;
    
    if (fileData.isLink) {
      // Para links, tentamos determinar o tipo pela URL
      const url = fileData.fileUrl.toLowerCase();
      if (url.includes('.mp4') || url.includes('.avi') || url.includes('.mov') || url.includes('youtube.com') || url.includes('vimeo.com')) {
        type = 'VIDEO' as const;
      } else if (url.includes('.pdf')) {
        type = 'PDF' as const;
      } else if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif')) {
        type = 'PDF' as const; // Usando PDF para imagens como no código original
      } else {
        type = 'AI' as const;
      }
    } else if (fileData.file) {
      const result = getFileTypeFromExtension(fileData.file.name);
      type = result.type;
    } else {
      type = 'AI' as const;
    }

    const newId = String(files.length + 1).padStart(2, '0');
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

    setFiles([newFile, ...files]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Floating circles */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-black/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-black/15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-20 left-32 w-5 h-5 bg-black/25 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        <div className="absolute top-1/2 right-32 w-3 h-3 bg-black/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.8s' }}></div>
        <div className="absolute bottom-32 right-16 w-7 h-7 bg-black/10 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.2s' }}></div>
        
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Moving diagonal lines */}
          <g className="animate-pulse" style={{ animationDuration: '6s' }}>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeDasharray="10,5">
              <animateTransform attributeName="transform" type="translate" values="0,0; 20,20; 0,0" dur="8s" repeatCount="indefinite"/>
            </line>
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(0,0,0,0.15)" strokeWidth="2" strokeDasharray="15,10">
              <animateTransform attributeName="transform" type="translate" values="0,0; -20,20; 0,0" dur="10s" repeatCount="indefinite"/>
            </line>
          </g>
          
          {/* Floating horizontal lines */}
          <g className="opacity-60">
            <line x1="0" y1="25%" x2="100%" y2="25%" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="5,15">
              <animateTransform attributeName="transform" type="translate" values="0,0; 30,0; 0,0" dur="12s" repeatCount="indefinite"/>
            </line>
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="8,12">
              <animateTransform attributeName="transform" type="translate" values="0,0; -25,0; 0,0" dur="9s" repeatCount="indefinite"/>
            </line>
          </g>
        </svg>
        
        {/* Neuromorphic floating elements */}
        <div className="absolute top-16 right-1/4 w-20 h-20 bg-gradient-to-br from-white to-slate-100 rounded-full shadow-[inset_-12px_-8px_40px_#46464620] animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-24 left-1/4 w-16 h-16 bg-gradient-to-br from-white to-slate-100 rounded-full shadow-[inset_-10px_-6px_30px_#46464620] animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-1/3 left-1/6 w-12 h-12 bg-gradient-to-br from-white to-slate-100 rounded-full shadow-[inset_-8px_-4px_20px_#46464620] animate-pulse" style={{ animationDuration: '3.5s' }}></div>
      </div>

      {/* Header */}
      <header className="bg-purple-700 px-6 py-4 relative z-10">
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
      <main className="p-6 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={() => setIsUploadFormOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold transform hover:scale-105 hover:translate-y-[-2px] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Upload className="h-4 w-4 mr-2" />
            Enviar Arquivos
          </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-800 text-lg font-semibold">Página 1 de 2</h2>
          <p className="text-gray-600">Exibindo 1-30 de {files.length + 37} arquivos</p>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
