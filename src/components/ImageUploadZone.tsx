
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X, Camera, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

interface ImageUploadZoneProps {
  onImageUpload: (file: File, imageUrl: string) => void;
  uploadedImage: string | null;
  onClearImage: () => void;
  isDarkTheme: boolean;
}

const ImageUploadZone = ({ onImageUpload, uploadedImage, onClearImage, isDarkTheme }: ImageUploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setIsUploading(true);
      // Simular delay de upload para mostrar animação
      await new Promise(resolve => setTimeout(resolve, 1500));
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(file, imageUrl);
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <Card className={`shadow-xl border-3 transition-all duration-500 transform hover:scale-105 ${
      isDarkTheme 
        ? 'bg-black border-orange-500 hover:border-orange-400 text-orange-100 hover:shadow-orange-500/20' 
        : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-blue-500/20'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      } transition-all duration-300`}>
        <CardTitle className={`text-xl flex items-center gap-2 ${
          isDarkTheme ? 'text-orange-300' : 'text-blue-600'
        } animate-pulse`}>
          <Camera className="h-6 w-6 animate-bounce" />
          📤 Upload de Imagem
          <Sparkles className="h-4 w-4 animate-spin" />
        </CardTitle>
        <p className={`text-sm ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
        } animate-fade-in`}>
          Adicione sua própria imagem para análise
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-500 cursor-pointer transform hover:scale-105 ${
              isDragOver
                ? (isDarkTheme ? 'border-orange-400 bg-orange-900/20 scale-105 animate-pulse' : 'border-blue-400 bg-blue-50 scale-105 animate-pulse')
                : (isDarkTheme ? 'border-orange-600 hover:border-orange-500' : 'border-gray-300 hover:border-gray-400')
            } ${isUploading ? 'animate-pulse' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleButtonClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {isUploading ? (
              <div className="animate-spin">
                <Upload className={`h-12 w-12 mx-auto mb-4 ${
                  isDarkTheme ? 'text-orange-400' : 'text-gray-400'
                } animate-bounce`} />
              </div>
            ) : (
              <Upload className={`h-12 w-12 mx-auto mb-4 ${
                isDarkTheme ? 'text-orange-400' : 'text-gray-400'
              } transition-transform duration-300 hover:scale-110`} />
            )}
            
            <p className={`text-lg font-medium mb-2 ${
              isDarkTheme ? 'text-orange-200' : 'text-gray-700'
            } transition-all duration-300`}>
              {isUploading ? '⏳ Processando imagem...' : 'Arraste uma imagem ou clique para selecionar'}
            </p>
            
            <p className={`text-sm ${
              isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
            } animate-fade-in`}>
              Suporta JPG, PNG, GIF (máx. 10MB)
            </p>
            
            <Button 
              className={`mt-4 transition-all duration-300 transform hover:scale-110 ${
                isDarkTheme 
                  ? 'bg-orange-500 hover:bg-orange-400 text-black animate-neural-glow' 
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
              disabled={isUploading}
            >
              <ImageIcon className="h-4 w-4 mr-2 animate-pulse" />
              {isUploading ? 'Carregando...' : 'Selecionar Imagem'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="relative transform transition-all duration-500 hover:scale-105">
              <img 
                src={uploadedImage} 
                alt="Imagem enviada"
                className="w-full h-64 object-cover rounded-lg border-2 border-orange-400 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30"
              />
              <Button
                onClick={onClearImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className={`p-4 rounded-lg border animate-pulse ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-orange-900/50 to-yellow-900/50 border-orange-600 text-orange-200' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
            } transition-all duration-500`}>
              <p className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin" />
                ✅ Imagem carregada com sucesso!
              </p>
              <p className="text-xs mt-1 animate-fade-in">
                Pronto para análise neural
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploadZone;
