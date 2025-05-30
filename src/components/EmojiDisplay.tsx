
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
}

interface EmojiDisplayProps {
  currentEmoji: EmojiItem | null;
  isDarkTheme: boolean;
  showPixelsCaptured: boolean;
}

const EmojiDisplay = ({ currentEmoji, isDarkTheme, showPixelsCaptured }: EmojiDisplayProps) => {
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
          O que estou vendo agora?
        </p>
      </CardHeader>
      <CardContent className="p-6">
        {currentEmoji ? (
          <div className="space-y-4">
            <div className={`aspect-square rounded-lg flex flex-col items-center justify-center shadow-inner border-2 border-dashed transition-all duration-300 ${
              isDarkTheme 
                ? 'bg-gradient-to-br from-yellow-900 to-orange-900 border-yellow-400 hover:border-yellow-300' 
                : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:border-blue-400'
            }`}>
              <div className="text-8xl mb-4 animate-pulse">{currentEmoji.emoji}</div>
              <div className="text-center">
                <p className={`text-xl font-bold capitalize mb-2 ${
                  isDarkTheme ? 'text-yellow-200' : 'text-gray-700'
                }`}>
                  {currentEmoji.name}
                </p>
                {showPixelsCaptured ? (
                  <Badge variant="outline" className={`animate-bounce ${
                    isDarkTheme 
                      ? 'bg-yellow-600 text-black border-yellow-400' 
                      : 'bg-green-100 text-green-800 border-green-300'
                  }`}>
                    ✅ Pixels Capturados!
                  </Badge>
                ) : (
                  <Badge variant="outline" className={`animate-bounce ${
                    isDarkTheme 
                      ? 'bg-yellow-700 text-yellow-200 border-yellow-500' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    🔍 Capturando pixels...
                  </Badge>
                )}
              </div>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              isDarkTheme 
                ? 'bg-yellow-900 border-yellow-600' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Eye className={`h-4 w-4 ${
                  isDarkTheme ? 'text-yellow-300' : 'text-blue-600'
                }`} />
                <span className={`text-sm font-medium ${
                  isDarkTheme ? 'text-yellow-200' : 'text-blue-800'
                }`}>
                  Status da Captura
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Resolução:</span>
                  <span className="font-mono">1024x1024</span>
                </div>
                <div className="flex justify-between">
                  <span>Formato:</span>
                  <span className="font-mono">RGB</span>
                </div>
                <div className="flex justify-between">
                  <span>Pixels:</span>
                  <span className="font-mono">1,048,576</span>
                </div>
                <div className="flex justify-between">
                  <span>Canais:</span>
                  <span className="font-mono">3 (RGB)</span>
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
                Aguardando entrada...
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
