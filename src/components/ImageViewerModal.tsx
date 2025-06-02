
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
}

const ImageViewerModal = ({ isOpen, onClose, imageUrl, imageName }: ImageViewerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] bg-black border-gray-800 p-0">
        <DialogHeader className="p-4 border-b border-gray-700">
          <DialogTitle className="text-white text-center">{imageName}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 max-h-[85vh] overflow-auto">
          <img 
            src={imageUrl} 
            alt={imageName}
            className="max-w-full max-h-full object-contain"
            style={{ 
              imageRendering: 'crisp-edges'
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;
