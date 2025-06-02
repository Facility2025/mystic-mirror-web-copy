import React, { useState } from 'react';
import { Download, Edit, File } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
}

const FileCard = ({ id, name, description, date, type, icon, fileUrl, fileType, isLink }: FileCardProps) => {
  const [imageError, setImageError] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return 'bg-red-500';
      case 'TEXT':
        return 'bg-green-500';
      case 'PDF':
        return 'bg-blue-500';
      case 'AI':
        return 'bg-purple-500';
      case 'VPS':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleVisualize = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  const renderFilePreview = () => {
    return (
      <div className="text-center flex items-center justify-center h-full">
        <File className="h-16 w-16 text-gray-400" />
      </div>
    );
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-purple-500 transition-colors">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
          {id}
        </span>
        <File className="h-6 w-6 text-gray-400" />
      </div>

      <div className="flex-1 mb-4 bg-slate-700 rounded overflow-hidden">
        {renderFilePreview()}
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-semibold">{name}</h3>
        <p className={`text-sm ${description ? 'text-gray-400' : 'text-red-500 border border-red-500 rounded px-2 py-1'}`}>
          {description || 'Descrição em branco'}
        </p>
        <p className="text-gray-500 text-xs">{date}</p>
      </div>

      <div className="flex space-x-2 mt-4">
        <div className="flex-1 relative">
          {/* Fundo negro para efeito de papel destacado */}
          <div className="absolute inset-0 bg-black rounded translate-x-1 translate-y-1 z-0"></div>
          <Button 
            onClick={handleVisualize}
            className="flex-1 bg-green-500 hover:bg-green-600 text-black text-sm relative z-10 w-full transform hover:translate-x-0.5 hover:translate-y-0.5 transition-transform duration-200"
            disabled={!fileUrl}
          >
            Visualizar
          </Button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gradient-to-r from-black/90 to-blue-300/30 text-white hover:from-black hover:to-blue-400/40 border-slate-600"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gradient-to-r from-black/90 to-blue-300/30 text-white hover:from-black hover:to-blue-400/40 border-slate-600"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
