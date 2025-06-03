
import React, { useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const PWAInstallPrompt = () => {
  const { isInstallable, installPWA } = usePWAInstall();
  const [isVisible, setIsVisible] = useState(true);

  if (!isInstallable || !isVisible) return null;

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
      <div className="bg-gradient-to-br from-black/95 to-gray-900/95 border border-purple-500/50 rounded-lg p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-sm">Instalar App</h3>
              <p className="text-gray-300 text-xs mt-1">
                Instale o Sistema de Arquivos em seu dispositivo para acesso rápido
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-400 hover:text-white ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex space-x-2 mt-3">
          <Button
            onClick={handleInstall}
            size="sm"
            className="flex-1 bg-green-500 hover:bg-green-600 text-black font-medium"
          >
            <Download className="h-4 w-4 mr-2" />
            Instalar
          </Button>
          <Button
            onClick={handleDismiss}
            variant="outline"
            size="sm"
            className="px-4 border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Agora não
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
