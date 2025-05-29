
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, RotateCcw, Circle, RectangleHorizontal, Triangle, Target, Users, Zap } from 'lucide-react';
import { useState } from 'react';

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  color: string;
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
  const [hoveredCategory, setHoveredCategory] = useState<string>('');

  const shapeCategories: ShapeCategory[] = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      description: 'Organismos com formas orgânicas e características naturais',
      icon: <Circle className="h-8 w-8" />,
      examples: ['🐱 Gatos', '🐶 Cachorros', '👤 Pessoas'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos Criados',
      description: 'Coisas feitas pelo ser humano com formas geométricas',
      icon: <RectangleHorizontal className="h-8 w-8" />,
      examples: ['🚗 Carros', '🏠 Casas', '📱 Telefones'],
      color: 'from-blue-400 to-indigo-500'
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Natureza',
      description: 'Elementos naturais com formas irregulares e orgânicas',
      icon: <Triangle className="h-8 w-8" />,
      examples: ['🏔️ Montanhas', '🌲 Árvores', '🌸 Flores'],
      color: 'from-purple-400 to-violet-500'
    }
  ];

  return (
    <Card className="bg-white shadow-lg border-2 border-green-200 hover:border-green-400 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="h-6 w-6 text-green-600" />
          🎯 Classificação Final
        </CardTitle>
        <p className="text-sm text-gray-600">Agora é sua vez de decidir!</p>
      </CardHeader>
      <CardContent className="p-6">
        {currentStep !== 'classification' ? (
          <div className="text-center py-8">
            <div className="relative">
              <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-xs">⏳</span>
              </div>
            </div>
            <p className="text-gray-500 mb-2">Aguardando processamento...</p>
            <p className="text-xs text-gray-400">Espere a IA terminar de pensar</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg border border-green-200 mb-4">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-green-800 mb-1">
                  🤝 Trabalho em Equipe!
                </p>
                <p className="text-sm text-green-700">
                  A IA fez sua análise, agora você decide qual categoria faz mais sentido
                </p>
              </div>
            </div>
            
            <RadioGroup 
              value={selectedShape} 
              onValueChange={onShapeSelection}
              disabled={selectedShape !== ''}
              className="space-y-4"
            >
              {shapeCategories.map((category) => (
                <div 
                  key={category.shape} 
                  className={`relative group transition-all duration-300 ${
                    hoveredCategory === category.shape ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.shape)}
                  onMouseLeave={() => setHoveredCategory('')}
                >
                  <div className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                    selectedShape === category.shape 
                      ? 'border-green-400 bg-green-50 shadow-lg' 
                      : hoveredCategory === category.shape
                        ? 'border-gray-300 bg-gray-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}>
                    <RadioGroupItem 
                      value={category.shape} 
                      id={category.shape}
                      disabled={selectedShape !== ''}
                      className="data-[state=checked]:border-green-500 data-[state=checked]:text-green-500"
                    />
                    
                    <div className={`p-3 rounded-full bg-gradient-to-r ${category.color} text-white shadow-md transition-transform duration-300 ${
                      hoveredCategory === category.shape ? 'scale-110' : ''
                    }`}>
                      {category.icon}
                    </div>
                    
                    <Label 
                      htmlFor={category.shape} 
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-lg mb-1">{category.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {category.examples.map((example, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Label>
                    
                    {selectedShape === category.shape && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1">
                        <Zap className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>

            {selectedShape !== '' && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mt-4">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">🎓 Aprendizado:</span> Assim como vocês trabalham em equipe na sala de aula, 
                  humanos e IA podem colaborar para tomar decisões melhores!
                </p>
              </div>
            )}
          </div>
        )}

        <div className="pt-6 border-t mt-6">
          <Button
            variant="outline"
            onClick={onResetGame}
            className="w-full hover:bg-gray-50 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            🔄 Nova Simulação
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShapeClassification;
