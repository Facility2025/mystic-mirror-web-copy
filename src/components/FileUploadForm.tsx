
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FileUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileData: { name: string; description: string; file: File | null; fileUrl: string; fileType: string }) => void;
}

const FileUploadForm = ({ isOpen, onClose, onSubmit }: FileUploadFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      onSubmit({ 
        name, 
        description, 
        file: selectedFile, 
        fileUrl, 
        fileType: selectedFile.type 
      });
      // Reset form
      setName('');
      setDescription('');
      setSelectedFile(null);
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-400">Enviar Arquivo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Arquivo
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`bg-slate-700 text-white ${!name ? 'border-red-500' : 'border-slate-600'}`}
              placeholder="Digite o nome do arquivo"
              required
            />
            {!name && (
              <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descrição
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white resize-none"
              placeholder="Digite uma descrição (opcional)"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">
              Selecionar Arquivo
            </label>
            <div className="space-y-3">
              <input
                id="file"
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept="*/*"
              />
              <Button
                type="button"
                onClick={() => document.getElementById('file')?.click()}
                variant="outline"
                className={`w-full text-white hover:bg-slate-700 ${!selectedFile ? 'border-red-500 text-red-400' : 'border-slate-600'}`}
              >
                <Upload className="h-4 w-4 mr-2" />
                Escolher Arquivo do Desktop
              </Button>
              {!selectedFile && (
                <p className="text-red-500 text-xs">Arquivo obrigatório</p>
              )}
              {selectedFile && (
                <p className="text-green-400 text-sm">
                  Arquivo selecionado: {selectedFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-slate-600 text-white hover:bg-slate-700"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!name || !selectedFile}
              className={`flex-1 font-semibold ${(!name || !selectedFile) ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-black'}`}
            >
              Enviar Arquivo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadForm;
