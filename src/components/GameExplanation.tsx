
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Layers, Circle, RectangleHorizontal, Triangle } from 'lucide-react';

const GameExplanation = () => {
  const shapeCategories = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      icon: <Circle className="h-6 w-6" />
    },
    {
      shape: 'rectangle', 
      name: 'Retângulo - Objetos Manufaturados',
      icon: <RectangleHorizontal className="h-6 w-6" />
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Elementos Naturais', 
      icon: <Triangle className="h-6 w-6" />
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Brain className="h-6 w-6" />
            Como Funciona uma Rede Neural?
          </CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700 space-y-3">
          <p>🔍 <strong>Entrada:</strong> A rede recebe uma imagem como dados</p>
          <p>🧩 <strong>Camadas:</strong> Diferentes níveis extraem características</p>
          <p>🎯 <strong>Classificação:</strong> O sistema decide qual categoria representa</p>
          <p>📚 <strong>Aprendizado:</strong> Treina com milhares de exemplos</p>
        </CardContent>
      </Card>

      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Layers className="h-6 w-6" />
            Categorias do Jogo
          </CardTitle>
        </CardHeader>
        <CardContent className="text-purple-700 space-y-2">
          {shapeCategories.map((category) => (
            <div key={category.shape} className="flex items-center gap-2">
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
          <p className="text-sm mt-3">
            💡 <strong>Objetivo:</strong> Compreender como as redes neurais classificam objetos por características
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameExplanation;
