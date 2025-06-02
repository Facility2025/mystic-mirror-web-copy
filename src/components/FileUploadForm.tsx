
import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface FileUploadFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (fileData: {
    name: string;
    description: string;
    file: File | null;
    fileUrl: string;
    fileType: string;
    isLink?: boolean;
    previewImage?: string; // Nova propriedade para imagem do preview
  }) => void;
}

const FileUploadForm = ({
  isOpen,
  onClose,
  onSubmit
}: FileUploadFormProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedImage, setPastedImage] = useState<File | null>(null); // Para área de Preview
  const [linkUrl, setLinkUrl] = useState(''); // Para campo de link
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    // Não limpar pastedImage e linkUrl - eles são independentes
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            setPastedImage(file); // Só afeta a área de Preview
            // Não limpar selectedFile e linkUrl - eles são independentes
          }
        }
      }
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(e.target.value);
    // Não limpar selectedFile e pastedImage - eles são independentes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && (selectedFile || pastedImage || linkUrl)) {
      let fileUrl = '';
      let fileType = '';
      let file = null;
      let isLink = false;
      let previewImage = '';

      // Processar arquivo selecionado
      if (selectedFile) {
        fileUrl = URL.createObjectURL(selectedFile);
        fileType = selectedFile.type;
        file = selectedFile;
      }

      // Processar link (independente do arquivo)
      if (linkUrl) {
        if (!fileUrl) { // Se não há arquivo, usar o link como fonte principal
          fileUrl = linkUrl;
          fileType = 'link';
          isLink = true;
        }
      }

      // Processar imagem da Preview (independente)
      if (pastedImage) {
        previewImage = URL.createObjectURL(pastedImage);
        // Se não há arquivo nem link, usar a imagem do preview como fonte principal
        if (!fileUrl) {
          fileUrl = previewImage;
          fileType = pastedImage.type;
          file = pastedImage;
        }
      }

      onSubmit({
        name,
        description,
        file,
        fileUrl,
        fileType,
        isLink,
        previewImage
      });

      // Reset form
      setName('');
      setDescription('');
      setSelectedFile(null);
      setPastedImage(null);
      setLinkUrl('');
      setCancelButtonClicked(false);
      onClose();
    }
  };

  const handleClose = () => {
    setCancelButtonClicked(true);
    setTimeout(() => {
      setName('');
      setDescription('');
      setSelectedFile(null);
      setPastedImage(null);
      setLinkUrl('');
      setCancelButtonClicked(false);
      onClose();
    }, 200);
  };

  const hasValidInput = name && (selectedFile || pastedImage || linkUrl);

  // Função para renderizar APENAS a imagem colada na área de Preview (independente)
  const renderPasteAreaContent = () => {
    if (pastedImage) {
      return <AspectRatio ratio={16 / 9} className="w-full">
          <img src={URL.createObjectURL(pastedImage)} alt="Imagem colada" className="w-full h-full object-cover rounded" />
        </AspectRatio>;
    }
    
    return <div className="min-h-[80px] flex items-center justify-center">
        <div className="text-center">
          <Image className="h-6 w-6 text-gray-400 mx-auto mb-1" />
          <p className="text-gray-400 text-sm">Ctrl+V para colar imagem</p>
        </div>
      </div>;
  };

  return <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-400">Enviar Arquivo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Arquivo
            </label>
            <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} className={`bg-slate-700 text-white ${!name ? 'border-red-500' : 'border-slate-600'}`} placeholder="Digite o nome do arquivo" required />
            {!name && <p className="text-xs mt-1 text-slate-50">Campo obrigatório</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descrição
            </label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="bg-slate-700 border-slate-600 text-white resize-none" placeholder="Digite uma descrição (opcional)" rows={3} />
          </div>

          {/* Campo para link do site - INDEPENDENTE */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-2">
              Link do Site
            </label>
            <Input id="link" type="url" value={linkUrl} onChange={handleLinkChange} className="bg-slate-700 text-white border-slate-600" placeholder="Cole o link do site aqui" />
            {linkUrl && <p className="text-green-400 text-xs mt-1">
                Link adicionado: {linkUrl}
              </p>}
          </div>

          {/* Área para colar imagem - INDEPENDENTE */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preview (Cole Imagem)
            </label>
            <div onPaste={handlePaste} className="w-full bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors" tabIndex={0}>
              {renderPasteAreaContent()}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Cole uma imagem com Ctrl+V nesta área
            </p>
          </div>

          {/* Seleção de arquivo - INDEPENDENTE */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">Arquivo do Desktop</label>
            <div className="space-y-3">
              <input id="file" type="file" onChange={handleFileSelect} className="hidden" accept="*/*" />
              <Button type="button" onClick={() => document.getElementById('file')?.click()} className="w-full bg-black hover:bg-gray-900 text-white border-gray-700">
                <Upload className="h-4 w-4 mr-2" />
                Escolher Arquivo do Desktop
              </Button>
              {selectedFile && <p className="text-green-400 text-sm">
                  Arquivo selecionado: {selectedFile.name}
                </p>}
            </div>
          </div>

          {!hasValidInput && <p className="text-xs text-slate-50">Adicione um nome e pelo menos um: arquivo, imagem colada ou link</p>}

          <div className="flex space-x-3 pt-4">
            <Button type="button" onClick={handleClose} variant="outline" className={`flex-1 border-gray-700 text-white transition-colors ${cancelButtonClicked ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'bg-black hover:bg-gray-900 border-gray-700'}`}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!hasValidInput} className={`flex-1 font-semibold ${!hasValidInput ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-black hover:bg-gray-900 text-white'}`}>
              Enviar Arquivo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};

export default FileUploadForm;
