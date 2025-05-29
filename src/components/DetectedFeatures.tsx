
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
  features: string[];
}

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  description: string;
}

interface DetectedFeaturesProps {
  currentEmoji: EmojiItem;
  correctShape: string;
  currentStep: 'input' | 'analysis' | 'classification';
}

const DetectedFeatures = ({ currentEmoji, correctShape, currentStep }: DetectedFeaturesProps) => {
  const shapeCategories: ShapeCategory[] = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      description: 'Representa organismos vivos com características orgânicas e curvas naturais'
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos Manufaturados', 
      description: 'Representa objetos criados pelo homem com formas regulares e geométricas'
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Elementos Naturais',
      description: 'Representa elementos da natureza com formas irregulares e orgânicas'
    }
  ];

  const correctCategory = shapeCategories.find(cat => cat.shape === correctShape);

  if (currentStep !== 'classification') {
    return null;
  }

  return (
    <Card className="mt-6 bg-indigo-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="text-indigo-800">🔍 Características Detectadas pela Rede Neural</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-indigo-700 mb-3 font-medium">
              Características identificadas em "{currentEmoji.name}":
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentEmoji.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="bg-white">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-indigo-700 mb-3 font-medium">
              Por que essa classificação?
            </p>
            <p className="text-sm text-indigo-600">
              {correctCategory?.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectedFeatures;
