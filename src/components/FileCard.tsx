import React, { useState } from 'react';
import { Download, Edit, Eye } from 'lucide-react';
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
}

const FileCard = ({ id, name, description, date, type, icon, fileUrl, fileType }: FileCardProps) => {
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

  const renderFilePreview = () => {
    if (!fileUrl) {
      return (
        <div className="text-center flex items-center justify-center h-full">
          {icon}
        </div>
      );
    }

    if (fileType?.startsWith('image/') && !imageError) {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <img 
            src={fileUrl} 
            alt={name}
            className="w-full h-full object-cover rounded"
            onError={() => setImageError(true)}
          />
        </AspectRatio>
      );
    }

    if (fileType?.startsWith('video/')) {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <video 
            src={fileUrl}
            className="w-full h-full object-cover rounded"
            controls
            preload="metadata"
          />
        </AspectRatio>
      );
    }

    if (fileType === 'application/pdf') {
      return (
        <AspectRatio ratio={16 / 9} className="w-full">
          <iframe
            src={fileUrl}
            className="w-full h-full rounded border-0"
            title={name}
          />
        </AspectRatio>
      );
    }

    return (
      <div className="text-center flex items-center justify-center h-full">
        {icon}
      </div>
    );
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 hover:border-purple-500 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-green-500 text-black text-xs font-bold px-2 py-1 rounded">
          {id}
        </span>
        <div className="text-right">
          <div className="flex items-center justify-end space-x-2 mb-2">
            {icon}
            <span className={`text-white text-xs px-2 py-1 rounded ${getTypeColor(type)}`}>
              {type}
            </span>
          </div>
        </div>
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
        <Button className="flex-1 bg-green-500 hover:bg-green-600 text-black text-sm">
          Visualizar
        </Button>
        <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="border-slate-600 text-white hover:bg-slate-700">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
