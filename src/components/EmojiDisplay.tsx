
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Eye, Zap, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
  features: string[];
  imageUrl: string;
}

interface EmojiDisplayProps {
  currentEmoji: EmojiItem | null;
  isDarkTheme: boolean;
  showPixelsCaptured: boolean;
}

const EmojiDisplay = ({ currentEmoji, isDarkTheme, showPixelsCaptured }: EmojiDisplayProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (currentEmoji) {
      setImageLoaded(false);
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = currentEmoji.imageUrl;
    }
  }, [currentEmoji]);

  return (
    <Card className={`shadow-lg border-2 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-black border-yellow-400 hover:border-yellow-300 text-yellow-100' 
        : 'bg-white border-blue-200 hover:border-blue-400'
    }`}>
      <CardHeader className={
        isDarkTheme 
          ? 'bg-gradient-to-r from-yellow-900 to-orange-900' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      }>
        <CardTitle className={`text-xl flex items-center gap-2 ${
          isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
        }`}>
          <Camera className="h-6 w-6" />
          📥 Entrada da Rede Neural
        </CardTitle>
        <p className={`text-sm ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
        }`}>
          Analisando imagem real com IA
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {currentEmoji ? (
          <div className="space-y-4">
            <div className={`aspect-square rounded-lg flex flex-col items-center justify-center shadow-inner border-2 border-dashed transition-all duration-300 overflow-hidden ${
              isDarkTheme 
                ? 'bg-gradient-to-br from-yellow-900 to-orange-900 border-yellow-400 hover:border-yellow-300' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:border-blue-400'
            }`}>
              {imageLoaded ? (
                <div className="w-full h-full relative">
                  <img 
                    src={currentEmoji.imageUrl} 
                    alt={currentEmoji.name}
                    className="w-full h-full object-cover rounded-lg"
                    style={{ filter: showPixelsCaptured ? 'none' : 'blur(2px)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className={`text-lg font-bold capitalize mb-2 text-white drop-shadow-lg`}>
                      {currentEmoji.name}
                    </p>
                    {showPixelsCaptured ? (
                      <Badge variant="outline" className={`animate-bounce bg-green-500 text-white border-green-400`}>
                        ✅ Análise Completa!
                      </Badge>
                    ) : (
                      <Badge variant="outline" className={`animate-pulse bg-yellow-600 text-black border-yellow-400`}>
                        🔍 Processando pixels...
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mb-4"></div>
                  <p className="text-yellow-300">Carregando imagem...</p>
                </div>
              )}
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDarkTheme 
                ? 'bg-yellow-900 border-yellow-600' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Eye className={`h-4 w-4 ${
                  isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
                }`} />
                <span className={`text-sm font-medium ${
                  isDarkTheme ? 'text-yellow-200' : 'text-blue-800'
                }`}>
                  Análise de Características
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs">
                {currentEmoji.features.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>• {feature}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      showPixelsCaptured ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-lg border text-xs ${
              isDarkTheme 
                ? 'bg-yellow-800 border-yellow-600 text-yellow-200' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span>Resolução:</span>
                  <span className="font-mono">400x400</span>
                </div>
                <div className="flex justify-between">
                  <span>Formato:</span>
                  <span className="font-mono">JPEG</span>
                </div>
                <div className="flex justify-between">
                  <span>Canais:</span>
                  <span className="font-mono">RGB (3)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pixels:</span>
                  <span className="font-mono">160,000</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`aspect-square rounded-lg flex items-center justify-center ${
            isDarkTheme ? 'bg-yellow-800' : 'bg-gray-100'
          }`}>
            <div className="text-center">
              <Brain className={`h-16 w-16 mx-auto mb-2 ${
                isDarkTheme ? 'text-yellow-400' : 'text-gray-400'
              }`} />
              <p className={
                isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
              }>
                Aguardando nova imagem...
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
