
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

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      onImageUpload(file, imageUrl);
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
    <Card className={`shadow-xl border-3 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-black border-orange-500 hover:border-orange-400 text-orange-100' 
        : 'bg-white border-blue-200 hover:border-blue-400'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}>
        <CardTitle className={`text-xl flex items-center gap-2 ${
          isDarkTheme ? 'text-orange-300' : 'text-blue-600'
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
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragOver
                ? (isDarkTheme ? 'border-orange-400 bg-orange-900/20' : 'border-blue-400 bg-blue-50')
                : (isDarkTheme ? 'border-orange-600 hover:border-orange-500' : 'border-gray-300 hover:border-gray-400')
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
              isDarkTheme ? 'text-orange-400' : 'text-gray-400'
            }`} />
            
            <p className={`text-lg font-medium mb-2 ${
              isDarkTheme ? 'text-orange-200' : 'text-gray-700'
            }`}>
              Arraste uma imagem ou clique para selecionar
            </p>
            
            <p className={`text-sm ${
              isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
            }`}>
              Suporta JPG, PNG, GIF (máx. 10MB)
            </p>
            
            <Button 
              className={`mt-4 ${
                isDarkTheme 
                  ? 'bg-orange-500 hover:bg-orange-400 text-black' 
                  : 'bg-blue-500 hover:bg-blue-400 text-white'
              }`}
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Selecionar Imagem
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={uploadedImage} 
                alt="Imagem enviada"
                className="w-full h-64 object-cover rounded-lg border-2 border-orange-400"
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
                ? 'bg-orange-900/50 border-orange-600 text-orange-200' 
                : 'bg-green-50 border-green-200 text-green-800'
            }`}>
              <p className="text-sm font-medium">
                ✅ Imagem carregada com sucesso!
              </p>
              <p className="text-xs mt-1">
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
