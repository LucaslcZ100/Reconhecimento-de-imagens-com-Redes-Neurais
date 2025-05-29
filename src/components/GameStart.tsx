
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface GameStartProps {
  onStartGame: () => void;
}

const GameStart = ({ onStartGame }: GameStartProps) => {
  return (
    <Card className="max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Play className="h-8 w-8 text-green-600" />
          Iniciar Simulação de Rede Neural
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6 text-lg">
          Vamos simular como uma rede neural reconhece e classifica objetos!
        </p>
        <Button onClick={onStartGame} size="lg" className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">
          🚀 Começar Análise
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameStart;
