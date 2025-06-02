import React, { useState } from 'react';
import { Upload, X, Link as LinkIcon, Image } from 'lucide-react';
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
  const [linkUrl, setLinkUrl] = useState('');
  const [pastedImage, setPastedImage] = useState<File | null>(null);
  const [cancelButtonClicked, setCancelButtonClicked] = useState(false);
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setLinkUrl(''); // Limpa o link se arquivo for selecionado
    setPastedImage(null); // Limpa imagem colada
  };
  const handlePaste = (event: React.ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            setPastedImage(file);
            setSelectedFile(null); // Limpa arquivo selecionado
            setLinkUrl(''); // Limpa link
          }
        }
      }
    }
  };
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(event.target.value);
    if (event.target.value) {
      setSelectedFile(null); // Limpa arquivo se link for inserido
      setPastedImage(null); // Limpa imagem colada
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && (selectedFile || pastedImage || linkUrl)) {
      let fileUrl = '';
      let fileType = '';
      let file = null;
      let isLink = false;
      if (linkUrl) {
        fileUrl = linkUrl;
        fileType = 'link';
        isLink = true;
      } else if (pastedImage) {
        fileUrl = URL.createObjectURL(pastedImage);
        fileType = pastedImage.type;
        file = pastedImage;
      } else if (selectedFile) {
        fileUrl = URL.createObjectURL(selectedFile);
        fileType = selectedFile.type;
        file = selectedFile;
      }
      onSubmit({
        name,
        description,
        file,
        fileUrl,
        fileType,
        isLink
      });

      // Reset form
      setName('');
      setDescription('');
      setSelectedFile(null);
      setLinkUrl('');
      setPastedImage(null);
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
      setLinkUrl('');
      setPastedImage(null);
      setCancelButtonClicked(false);
      onClose();
    }, 200);
  };
  const hasValidInput = name && (selectedFile || pastedImage || linkUrl);

  // Função para verificar se é uma imagem
  const isImage = (file: File) => {
    return file && file.type.startsWith('image/');
  };

  // Função para renderizar a imagem na área de colar
  const renderPasteAreaContent = () => {
    // Prioridade: 1. Imagem colada, 2. Arquivo selecionado (se for imagem), 3. Placeholder
    const imageToShow = pastedImage || (selectedFile && isImage(selectedFile) ? selectedFile : null);
    if (imageToShow) {
      return <AspectRatio ratio={16 / 9} className="w-full">
          <img src={URL.createObjectURL(imageToShow)} alt="Imagem selecionada" className="w-full h-full object-cover rounded" />
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
            {!name && <p className="text-red-500 text-xs mt-1">Campo obrigatório</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Descrição
            </label>
            <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="bg-slate-700 border-slate-600 text-white resize-none" placeholder="Digite uma descrição (opcional)" rows={3} />
          </div>

          {/* Campo para Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-2">
              Link do Arquivo
            </label>
            <Input id="link" type="url" value={linkUrl} onChange={handleLinkChange} className="bg-slate-700 border-slate-600 text-white" placeholder="Cole o link do arquivo (opcional)" />
            {linkUrl && <p className="text-green-400 text-xs mt-1">
                <LinkIcon className="h-3 w-3 inline mr-1" />
                Link adicionado
              </p>}
          </div>

          {/* Área para colar imagem com preview retangular */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Colar Imagem
            </label>
            <div onPaste={handlePaste} className="w-full bg-slate-700 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-slate-500 transition-colors" tabIndex={0}>
              {renderPasteAreaContent()}
            </div>
          </div>

          {/* Seleção de arquivo com botão vermelho */}
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-300 mb-2">Selecione um arquivo, cole uma imagem ou insira um link</label>
            <div className="space-y-3">
              <input id="file" type="file" onChange={handleFileSelect} className="hidden" accept="*/*" />
              <Button type="button" onClick={() => document.getElementById('file')?.click()} className="w-full bg-red-500 hover:bg-red-600 text-white border-red-500">
                <Upload className="h-4 w-4 mr-2" />
                Escolher Arquivo do Desktop
              </Button>
              {selectedFile && <p className="text-green-400 text-sm">
                  Arquivo selecionado: {selectedFile.name}
                </p>}
            </div>
          </div>

          {!hasValidInput && <p className="text-xs text-slate-50">Selecione um arquivo, cole uma imagem ou insira um link</p>}

          <div className="flex space-x-3 pt-4">
            <Button type="button" onClick={handleClose} variant="outline" className={`flex-1 border-slate-600 text-white transition-colors ${cancelButtonClicked ? 'bg-red-500 hover:bg-red-600 border-red-500' : 'bg-green-500 hover:bg-green-600 border-green-500'}`}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!hasValidInput} className={`flex-1 font-semibold ${!hasValidInput ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-500 hover:bg-green-600 text-black'}`}>
              Enviar Arquivo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};
export default FileUploadForm;