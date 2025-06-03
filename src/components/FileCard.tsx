import React, { useState } from 'react';
import { Download, Edit, File, FileText, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ImageViewerModal from './ImageViewerModal';
import EditFileModal from './EditFileModal';

interface FileCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  type: 'VIDEO' | 'TEXT' | 'PDF' | 'AI' | 'VPS';
  icon: React.ReactNode;
  fileUrl?: string;
  fileType?: string;
  isLink?: boolean;
  previewImage?: string;
  onUpdate?: (id: string, name: string, description: string) => void;
}

const FileCard = ({
  id,
  name,
  description,
  date,
  type,
  icon,
  fileUrl,
  fileType,
  isLink,
  previewImage,
  onUpdate
}: FileCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return 'bg-red-500';
      case 'TEXT':
        return 'bg-neon-green';
      case 'PDF':
        return 'bg-blue-500';
      case 'AI':
        return 'bg-orange-accent';
      case 'VPS':
        return 'bg-orange-accent';
      default:
        return 'bg-gray-500';
    }
  };

  const handleVisualize = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    if (fileUrl) {
      // Se for um link, abre em nova aba
      if (isLink) {
        window.open(fileUrl, '_blank');
      } else {
        // Se for arquivo local, também abre em nova aba
        window.open(fileUrl, '_blank');
      }
    }
  };

  const handleImageClick = () => {
    const imageUrl = previewImage || fileUrl;
    if (imageUrl && (isImage() || previewImage)) {
      setIsImageViewerOpen(true);
    } else {
      handleVisualize();
    }
  };

  const handleDownload = () => {
    const imageUrl = previewImage || fileUrl;
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = name || 'arquivo';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (newName: string, newDescription: string) => {
    if (onUpdate) {
      onUpdate(id, newName, newDescription);
    }
  };

  const isImage = () => {
    if (!fileType && !fileUrl) return false;

    // Verifica por tipo MIME
    if (fileType && fileType.startsWith('image/')) return true;

    // Verifica por extensão na URL ou se é um link de imagem conhecido
    if (fileUrl) {
      const url = fileUrl.toLowerCase();
      return url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png') || url.includes('.gif') || url.includes('.webp') || url.includes('.svg') || url.includes('.bmp') || url.includes('.ico') || url.includes('unsplash.com') || url.includes('imgur.com') || url.includes('images.') || url.includes('/image/') || url.includes('cdn.') || url.includes('static.');
    }
    return false;
  };

  const isPDF = () => {
    if (!fileType && !fileUrl) return false;

    // Verifica por tipo MIME
    if (fileType && fileType === 'application/pdf') return true;

    // Verifica por extensão na URL
    if (fileUrl) {
      return fileUrl.toLowerCase().includes('.pdf');
    }
    return false;
  };

  const isTextDocument = () => {
    if (!fileType && !fileUrl) return false;

    // Verifica por tipo MIME
    if (fileType) {
      return fileType.startsWith('text/') || fileType.includes('document') || fileType.includes('word') || fileType.includes('spreadsheet') || fileType.includes('presentation');
    }

    // Verifica por extensão na URL
    if (fileUrl) {
      const url = fileUrl.toLowerCase();
      return url.includes('.txt') || url.includes('.doc') || url.includes('.docx') || url.includes('.xls') || url.includes('.xlsx') || url.includes('.ppt') || url.includes('.pptx') || url.includes('.rtf');
    }
    return false;
  };

  const renderFilePreview = () => {
    // Se há previewImage (imagem colada no formulário), sempre mostra ela em formato retangular
    if (previewImage && !imageError) {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <img 
            src={previewImage} 
            alt={name} 
            className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageClick}
            onError={() => {
              console.log('Erro ao carregar preview image:', previewImage);
              setImageError(true);
            }}
            onLoad={() => {
              console.log('Preview image carregada com sucesso:', previewImage);
            }}
          />
        </AspectRatio>
      );
    }

    // Se há fileUrl e é uma imagem, sempre tenta mostrar em formato retangular
    if (fileUrl && isImage() && !imageError) {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <img 
            src={fileUrl} 
            alt={name} 
            className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleImageClick}
            onError={() => {
              console.log('Erro ao carregar imagem:', fileUrl);
              setImageError(true);
            }}
            onLoad={() => {
              console.log('Imagem carregada com sucesso:', fileUrl);
            }}
          />
        </AspectRatio>
      );
    }

    // PDFs
    if (isPDF()) {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <div className="w-full h-full bg-red-900/20 border border-red-500/30 rounded flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-red-400 mb-2" />
            <span className="text-sm font-medium text-red-300">PDF</span>
          </div>
        </AspectRatio>
      );
    }

    // Documentos de texto
    if (isTextDocument()) {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <div className="w-full h-full bg-neon-green/10 border border-neon-green/30 rounded flex flex-col items-center justify-center">
            <FileText className="h-12 w-12 text-neon-green mb-2" />
            <span className="text-sm font-medium text-neon-green">DOC</span>
          </div>
        </AspectRatio>
      );
    }

    // Arquivo padrão - agora com mais informações sobre o que foi enviado
    return (
      <AspectRatio ratio={16 / 9} className="w-full">
        <div className="w-full h-full bg-darker-blue border border-neon-green/20 rounded flex flex-col items-center justify-center p-2">
          <File className="h-12 w-12 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-300 text-center">
            {fileType ? fileType.split('/')[0].toUpperCase() : 'FILE'}
          </span>
        </div>
      </AspectRatio>
    );
  };

  return (
    <>
      <div className="bg-gradient-to-br from-dark-blue to-darker-blue border border-neon-green/30 rounded-lg p-4 hover:border-neon-green/60 transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,255,127,0.1)] hover:shadow-[0_0_25px_rgba(0,255,127,0.3)]">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-neon-green text-black text-xs font-bold px-2 py-1 rounded">
            {id}
          </span>
          <File className="h-6 w-6 text-gray-400" />
        </div>

        <div className="flex-1 mb-4 bg-darker-blue/50 rounded overflow-hidden border border-neon-green/20">
          {renderFilePreview()}
        </div>

        <div className="space-y-2">
          <h3 className="text-white font-semibold">{name}</h3>
          <p className={`text-sm ${description ? 'text-gray-300' : 'text-red-400 border border-red-400/50 rounded px-2 py-1'}`}>
            {description || 'Descrição em branco'}
          </p>
          <p className="text-gray-400 text-xs">{date}</p>
        </div>

        <div className="flex space-x-2 mt-4">
          <div className="flex-1 relative">
            <Button 
              onClick={handleVisualize}
              className={`flex-1 text-white text-sm w-full transition-all duration-300 border ${
                isClicked 
                  ? 'bg-red-500 hover:bg-red-600 transform translate-x-2 translate-y-2 border-red-400' 
                  : 'bg-dark-green hover:bg-neon-green hover:text-black border-neon-green/30'
              }`}
              disabled={!fileUrl}
            >
              Visualizar
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="bg-dark-blue text-white hover:bg-neon-green hover:text-black border-neon-green/30 hover:border-neon-green transition-all duration-300"
            disabled={!fileUrl && !previewImage}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleEdit}
            className="bg-dark-blue text-white hover:bg-orange-accent hover:text-black border-orange-accent/30 hover:border-orange-accent transition-all duration-300"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ImageViewerModal
        isOpen={isImageViewerOpen}
        onClose={() => setIsImageViewerOpen(false)}
        imageUrl={previewImage || fileUrl || ''}
        imageName={name}
      />

      <EditFileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        fileName={name}
        fileDescription={description}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default FileCard;
