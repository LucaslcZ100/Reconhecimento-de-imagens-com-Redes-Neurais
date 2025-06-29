
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X, Camera } from 'lucide-react';
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
      // Simular delay de upload
      await new Promise(resolve => setTimeout(resolve, 1000));
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
    <Card className={`shadow-xl border-3 ${
      isDarkTheme 
        ? 'bg-black border-yellow-500 text-yellow-100' 
        : 'bg-white border-blue-200'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-yellow-900 to-yellow-800' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}>
        <CardTitle className={`text-xl flex items-center gap-2 ${
          isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
        }`}>
          <Camera className="h-6 w-6" />
          📤 Upload de Imagem
        </CardTitle>
        <p className={`text-sm ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
        }`}>
          Adicione sua própria imagem para análise
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {!uploadedImage ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
              isDragOver
                ? (isDarkTheme ? 'border-yellow-400 bg-yellow-900/20' : 'border-blue-400 bg-blue-50')
                : (isDarkTheme ? 'border-yellow-600' : 'border-gray-300')
            }`}
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
            
            <Upload className={`h-12 w-12 mx-auto mb-4 ${
              isDarkTheme ? 'text-yellow-400' : 'text-gray-400'
            }`} />
            
            <p className={`text-lg font-medium mb-2 ${
              isDarkTheme ? 'text-yellow-200' : 'text-gray-700'
            }`}>
              {isUploading ? '⏳ Processando imagem...' : 'Arraste uma imagem ou clique para selecionar'}
            </p>
            
            <p className={`text-sm ${
              isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
            }`}>
              Suporta JPG, PNG, GIF (máx. 10MB)
            </p>
            
            <Button 
              className={`mt-4 ${
                isDarkTheme 
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-black' 
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
              disabled={isUploading}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              {isUploading ? 'Carregando...' : 'Selecionar Imagem'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="Imagem enviada"
                className="w-full h-64 object-cover rounded-lg border-2 border-yellow-400 shadow-lg"
              />
              <Button
                onClick={onClearImage}
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-yellow-900/50 to-yellow-800/50 border-yellow-600 text-yellow-200' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800'
            }`}>
              <p className="text-sm font-medium">
                ✅ Imagem carregada com sucesso!
              </p>
              <p className="text-xs mt-1">
                Pronto para análise
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploadZone;
