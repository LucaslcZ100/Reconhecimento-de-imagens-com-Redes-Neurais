
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Eye, Zap, Camera, Activity, Cpu } from 'lucide-react';
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
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (currentEmoji) {
      setImageLoaded(false);
      setProcessingProgress(0);
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
        // Simular progresso de processamento
        const progressInterval = setInterval(() => {
          setProcessingProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 2;
          });
        }, 100);
      };
      img.src = currentEmoji.imageUrl;
    }
  }, [currentEmoji]);

  return (
    <Card className={`shadow-xl border-3 transition-all duration-500 neural-interactive ${
      isDarkTheme 
        ? 'bg-black border-yellow-400 hover:border-yellow-300 text-yellow-100 hover:shadow-yellow-400/30' 
        : 'bg-white border-blue-200 hover:border-blue-400'
    } ${isHovered ? 'animate-neural-glow' : ''}`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <CardHeader className={`transition-all duration-300 ${
        isDarkTheme 
          ? 'bg-gradient-to-r from-yellow-900 via-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-blue-50 to-indigo-50'
      }`}>
        <CardTitle className={`text-xl flex items-center gap-3 font-neural-display ${
          isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
        }`}>
          <div className="relative">
            <Camera className="h-6 w-6" />
            {showPixelsCaptured && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            )}
          </div>
          📥 Sistema de Visão Neural
          <Activity className={`h-5 w-5 ${showPixelsCaptured ? 'animate-neural-pulse' : ''}`} />
        </CardTitle>
        <p className={`text-sm font-medium ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
        }`}>
          IA processando imagem em tempo real
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {currentEmoji ? (
          <div className="space-y-4">
            <div className={`aspect-square rounded-xl flex flex-col items-center justify-center shadow-inner border-3 border-dashed transition-all duration-500 overflow-hidden neural-interactive ${
              isDarkTheme 
                ? 'bg-gradient-to-br from-yellow-900 via-orange-900 to-yellow-800 border-yellow-400 hover:border-yellow-300' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:border-blue-400'
            }`}>
              {imageLoaded ? (
                <div className="w-full h-full relative group">
                  <img 
                    src={currentEmoji.imageUrl} 
                    alt={currentEmoji.name}
                    className={`w-full h-full object-cover rounded-xl transition-all duration-700 ${
                      showPixelsCaptured ? 'filter-none' : 'blur-sm'
                    } group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                  
                  {/* Progresso de Processamento */}
                  {!showPixelsCaptured && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/70 rounded-lg p-4 text-center">
                        <Cpu className="h-8 w-8 text-yellow-400 mx-auto mb-2 animate-spin" />
                        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
                            style={{ width: `${processingProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-yellow-300 text-xs mt-2 font-neural-mono">
                          Processando... {processingProgress}%
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className={`text-lg font-bold capitalize mb-2 text-white drop-shadow-lg font-neural-display`}>
                      {currentEmoji.name}
                    </p>
                    {showPixelsCaptured ? (
                      <Badge variant="outline" className={`animate-bounce bg-green-500 text-white border-green-400 font-neural-mono`}>
                        ✅ Análise Neural Completa!
                      </Badge>
                    ) : (
                      <Badge variant="outline" className={`animate-pulse bg-yellow-600 text-black border-yellow-400 font-neural-mono`}>
                        🧠 Neurônios Ativando...
                      </Badge>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mb-4"></div>
                  <p className="text-yellow-300 font-neural">Carregando imagem neural...</p>
                </div>
              )}
            </div>
            
            <div className={`p-4 rounded-lg border transition-all duration-300 neural-interactive ${
              isDarkTheme 
                ? 'bg-yellow-900/80 border-yellow-600 hover:bg-yellow-900' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Eye className={`h-4 w-4 ${
                  isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
                }`} />
                <span className={`text-sm font-semibold font-neural-display ${
                  isDarkTheme ? 'text-yellow-200' : 'text-blue-800'
                }`}>
                  Características Detectadas
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-xs font-neural">
                {currentEmoji.features.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded transition-all duration-200 hover:bg-yellow-800/50">
                    <span>🔍 {feature}</span>
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                      showPixelsCaptured 
                        ? 'bg-green-400 animate-pulse shadow-green-400/50 shadow-lg' 
                        : 'bg-yellow-400 animate-ping'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-3 rounded-lg border text-xs font-neural-mono transition-all duration-300 neural-interactive ${
              isDarkTheme 
                ? 'bg-yellow-800/80 border-yellow-600 text-yellow-200 hover:bg-yellow-800' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex justify-between">
                  <span>Resolução:</span>
                  <span className="font-bold">400×400px</span>
                </div>
                <div className="flex justify-between">
                  <span>Formato:</span>
                  <span className="font-bold">JPEG</span>
                </div>
                <div className="flex justify-between">
                  <span>Canais:</span>
                  <span className="font-bold">RGB (3)</span>
                </div>
                <div className="flex justify-between">
                  <span>Pixels:</span>
                  <span className="font-bold">160.000</span>
                </div>
                <div className="flex justify-between">
                  <span>Profundidade:</span>
                  <span className="font-bold">24-bit</span>
                </div>
                <div className="flex justify-between">
                  <span>Precisão:</span>
                  <span className="font-bold text-green-400">97.8%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 neural-interactive ${
            isDarkTheme ? 'bg-yellow-800/50 hover:bg-yellow-800' : 'bg-gray-100'
          }`}>
            <div className="text-center">
              <Brain className={`h-16 w-16 mx-auto mb-2 animate-neural-pulse ${
                isDarkTheme ? 'text-yellow-400' : 'text-gray-400'
              }`} />
              <p className={`font-neural ${
                isDarkTheme ? 'text-yellow-300' : 'text-gray-500'
              }`}>
                Sistema neural aguardando entrada...
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
