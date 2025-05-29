
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Eye, Zap, Camera } from 'lucide-react';

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
  features: string[];
}

interface EmojiDisplayProps {
  currentEmoji: EmojiItem | null;
}

const EmojiDisplay = ({ currentEmoji }: EmojiDisplayProps) => {
  return (
    <Card className="bg-white shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardTitle className="text-xl flex items-center gap-2">
          <Camera className="h-6 w-6 text-blue-600" />
          📥 Entrada da Rede Neural
        </CardTitle>
        <p className="text-sm text-gray-600">O que estou vendo agora?</p>
      </CardHeader>
      <CardContent className="p-6">
        {currentEmoji ? (
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex flex-col items-center justify-center shadow-inner border-2 border-dashed border-blue-200 hover:border-blue-400 transition-all duration-300">
              <div className="text-8xl mb-4 animate-pulse">{currentEmoji.emoji}</div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-700 capitalize mb-2">{currentEmoji.name}</p>
                <Badge variant="outline" className="animate-bounce bg-blue-100 text-blue-800">
                  🔍 Capturando pixels...
                </Badge>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Status da Captura</span>
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
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Aguardando entrada...</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
