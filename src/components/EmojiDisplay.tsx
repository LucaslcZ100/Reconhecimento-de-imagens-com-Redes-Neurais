
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';

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
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">📥 Entrada da Rede Neural</CardTitle>
      </CardHeader>
      <CardContent>
        {currentEmoji ? (
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex flex-col items-center justify-center shadow-inner">
            <div className="text-8xl mb-4">{currentEmoji.emoji}</div>
            <p className="text-xl font-bold text-gray-700 capitalize">{currentEmoji.name}</p>
            <Badge variant="outline" className="mt-2">
              Analisando características...
            </Badge>
          </div>
        ) : (
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <Brain className="h-16 w-16 text-gray-400" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmojiDisplay;
