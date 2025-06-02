
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EditFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileDescription: string;
  onSave: (name: string, description: string) => void;
}

const EditFileModal = ({ isOpen, onClose, fileName, fileDescription, onSave }: EditFileModalProps) => {
  const [name, setName] = useState(fileName);
  const [description, setDescription] = useState(fileDescription);

  const handleSave = () => {
    onSave(name, description);
    onClose();
  };

  const handleClose = () => {
    setName(fileName);
    setDescription(fileDescription);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Editar Arquivo</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fileName" className="text-gray-300">Nome do Arquivo</Label>
            <Input
              id="fileName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
          <div>
            <Label htmlFor="fileDescription" className="text-gray-300">Descrição</Label>
            <Textarea
              id="fileDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose} className="border-gray-600 text-gray-300">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
              Salvar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditFileModal;
