
import React from 'react';
import { Download, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  type: 'VIDEO' | 'TEXT' | 'PDF' | 'AI' | 'VPS';
  icon: React.ReactNode;
}

const FileCard = ({ id, name, description, date, type, icon }: FileCardProps) => {
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

      <div className="flex-1 min-h-[120px] flex items-center justify-center mb-4">
        <div className="text-center">
          {icon}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
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
