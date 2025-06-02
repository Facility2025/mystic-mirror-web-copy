
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
      <DialogContent className="max-w-none w-[1280px] h-[720px] bg-black border-gray-800 p-0">
        <DialogHeader className="p-4">
          <DialogTitle className="text-white">{imageName}</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[calc(100%-60px)] flex items-center justify-center">
          <img 
            src={imageUrl} 
            alt={imageName}
            className="max-w-full max-h-full object-contain"
            style={{ width: '1280px', height: '720px', objectFit: 'contain' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;
