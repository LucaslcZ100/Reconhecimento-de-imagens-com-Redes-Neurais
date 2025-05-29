
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, RotateCcw, Circle, RectangleHorizontal, Triangle } from 'lucide-react';

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ShapeClassificationProps {
  currentStep: 'input' | 'analysis' | 'classification';
  selectedShape: string;
  onShapeSelection: (shape: string) => void;
  onResetGame: () => void;
}

const ShapeClassification = ({ 
  currentStep, 
  selectedShape, 
  onShapeSelection, 
  onResetGame 
}: ShapeClassificationProps) => {
  const shapeCategories: ShapeCategory[] = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      description: 'Representa organismos vivos com características orgânicas e curvas naturais',
      icon: <Circle className="h-8 w-8" />
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos Manufaturados',
      description: 'Representa objetos criados pelo homem com formas regulares e geométricas',
      icon: <RectangleHorizontal className="h-8 w-8" />
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Elementos Naturais',
      description: 'Representa elementos da natureza com formas irregulares e orgânicas',
      icon: <Triangle className="h-8 w-8" />
    }
  ];

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">🎯 Classificação Final</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentStep !== 'classification' ? (
          <div className="text-center py-8">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aguardando processamento...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-gray-700 mb-4">
              Com base na análise neural, escolha a categoria:
            </p>
            
            <RadioGroup 
              value={selectedShape} 
              onValueChange={onShapeSelection}
              disabled={selectedShape !== ''}
              className="space-y-3"
            >
              {shapeCategories.map((category) => (
                <div key={category.shape} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem 
                    value={category.shape} 
                    id={category.shape}
                    disabled={selectedShape !== ''}
                  />
                  <Label 
                    htmlFor={category.shape} 
                    className="flex items-center gap-3 cursor-pointer text-sm flex-1"
                  >
                    {category.icon}
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            onClick={onResetGame}
            className="w-full"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar Simulação
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShapeClassification;
