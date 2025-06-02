
import React from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageName: string;
}

const ImageViewerModal = ({ isOpen, onClose, imageUrl, imageName }: ImageViewerModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full bg-black border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">{imageName}</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <AspectRatio ratio={16 / 9} className="w-full">
            <img 
              src={imageUrl} 
              alt={imageName}
              className="w-full h-full object-contain rounded"
            />
          </AspectRatio>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageViewerModal;
