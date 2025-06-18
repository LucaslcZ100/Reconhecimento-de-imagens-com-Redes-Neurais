
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Circle, RectangleHorizontal, Triangle, User, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ClassificationOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  color: string;
}

interface UserClassificationProps {
  onClassification: (classification: string) => void;
  selectedClassification: string;
  isDarkTheme: boolean;
  uploadedImage: string | null;
}

const UserClassification = ({ onClassification, selectedClassification, isDarkTheme, uploadedImage }: UserClassificationProps) => {
  const [hoveredOption, setHoveredOption] = useState<string>('');

  const classificationOptions: ClassificationOption[] = [
    {
      id: 'living',
      name: 'Ser Vivo',
      description: 'Organismos com vida: animais, pessoas, plantas',
      icon: <Circle className="h-8 w-8" />,
      examples: ['🐱 Animais', '👤 Pessoas', '🌿 Plantas'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'manufactured',
      name: 'Objeto Manufaturado',
      description: 'Criações humanas: tecnologia, ferramentas, construções',
      icon: <RectangleHorizontal className="h-8 w-8" />,
      examples: ['🚗 Veículos', '🏠 Construções', '📱 Tecnologia'],
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'natural',
      name: 'Elemento Natural',
      description: 'Componentes da natureza: paisagens, fenômenos naturais',
      icon: <Triangle className="h-8 w-8" />,
      examples: ['🏔️ Paisagens', '🌊 Oceanos', '☁️ Céu'],
      color: 'from-purple-400 to-violet-500'
    }
  ];

  if (!uploadedImage) {
    return (
      <Card className={`shadow-xl border-3 transition-all duration-300 opacity-50 ${
        isDarkTheme 
          ? 'bg-black border-orange-500 text-orange-100' 
          : 'bg-white border-gray-200'
      }`}>
        <CardHeader className={`${
          isDarkTheme 
            ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
            : 'bg-gradient-to-r from-gray-50 to-gray-100'
        }`}>
          <CardTitle className={`text-xl flex items-center gap-2 ${
            isDarkTheme ? 'text-orange-300' : 'text-gray-600'
          }`}>
            <User className="h-6 w-6" />
            🤔 Sua Classificação
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <Brain className={`h-12 w-12 mx-auto mb-4 ${
            isDarkTheme ? 'text-orange-400' : 'text-gray-400'
          }`} />
          <p className={`${
            isDarkTheme ? 'text-orange-300' : 'text-gray-500'
          }`}>
            Primeiro faça o upload de uma imagem
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`shadow-xl border-3 transition-all duration-300 ${
      isDarkTheme 
        ? 'bg-black border-orange-500 hover:border-orange-400 text-orange-100' 
        : 'bg-white border-green-200 hover:border-green-400'
    }`}>
      <CardHeader className={`${
        isDarkTheme 
          ? 'bg-gradient-to-r from-orange-900 to-yellow-900' 
          : 'bg-gradient-to-r from-green-50 to-teal-50'
      }`}>
        <CardTitle className={`text-xl flex items-center gap-2 ${
          isDarkTheme ? 'text-orange-300' : 'text-green-600'
        }`}>
          <User className="h-6 w-6" />
          🤔 Sua Classificação
        </CardTitle>
        <p className={`text-sm ${
          isDarkTheme ? 'text-yellow-200' : 'text-gray-600'
        }`}>
          Como você classificaria esta imagem?
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className={`p-4 rounded-lg border mb-4 ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-orange-900 to-yellow-900 border-orange-600' 
                : 'bg-gradient-to-r from-green-100 to-teal-100 border-green-200'
            }`}>
              <User className={`h-8 w-8 mx-auto mb-2 ${
                isDarkTheme ? 'text-orange-300' : 'text-green-600'
              }`} />
              <p className={`font-medium mb-1 ${
                isDarkTheme ? 'text-orange-200' : 'text-green-800'
              }`}>
                🧠 Análise Humana
              </p>
              <p className={`text-sm ${
                isDarkTheme ? 'text-yellow-300' : 'text-green-700'
              }`}>
                Use sua inteligência para classificar a imagem
              </p>
            </div>
          </div>
          
          <RadioGroup 
            value={selectedClassification} 
            onValueChange={onClassification}
            className="space-y-4"
          >
            {classificationOptions.map((option) => (
              <div 
                key={option.id} 
                className={`relative group transition-all duration-300 ${
                  hoveredOption === option.id ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption('')}
              >
                <div className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedClassification === option.id 
                    ? (isDarkTheme 
                        ? 'border-orange-400 bg-orange-900 shadow-lg' 
                        : 'border-green-400 bg-green-50 shadow-lg') 
                    : hoveredOption === option.id
                      ? (isDarkTheme 
                          ? 'border-orange-500 bg-orange-800 shadow-md' 
                          : 'border-gray-300 bg-gray-50 shadow-md')
                      : (isDarkTheme 
                          ? 'border-orange-600 hover:border-orange-500 hover:bg-orange-800' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50')
                }`}>
                  <RadioGroupItem 
                    value={option.id} 
                    id={option.id}
                    className={`${
                      isDarkTheme 
                        ? 'data-[state=checked]:border-orange-400 data-[state=checked]:text-orange-400' 
                        : 'data-[state=checked]:border-green-500 data-[state=checked]:text-green-500'
                    }`}
                  />
                  
                  <div className={`p-3 rounded-full bg-gradient-to-r ${option.color} text-white shadow-md transition-transform duration-300 ${
                    hoveredOption === option.id ? 'scale-110' : ''
                  }`}>
                    {option.icon}
                  </div>
                  
                  <Label 
                    htmlFor={option.id} 
                    className="flex-1 cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-lg mb-1">{option.name}</p>
                      <p className={`text-sm mb-2 ${
                        isDarkTheme ? 'text-orange-300' : 'text-gray-600'
                      }`}>
                        {option.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {option.examples.map((example, i) => (
                          <span key={i} className={`text-xs px-2 py-1 rounded-full ${
                            isDarkTheme ? 'bg-orange-800 text-orange-200' : 'bg-gray-100'
                          }`}>
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Label>
                  
                  {selectedClassification === option.id && (
                    <div className={`absolute -top-2 -right-2 rounded-full p-1 ${
                      isDarkTheme ? 'bg-orange-500 text-black' : 'bg-green-500 text-white'
                    }`}>
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </RadioGroup>

          {selectedClassification && (
            <div className={`p-4 rounded-lg border mt-4 ${
              isDarkTheme 
                ? 'bg-gradient-to-r from-orange-900 to-yellow-900 border-orange-600' 
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            }`}>
              <p className={`text-sm ${
                isDarkTheme ? 'text-orange-200' : 'text-blue-800'
              }`}>
                <span className="font-medium">✅ Classificação Registrada:</span> Você classificou esta imagem como{' '}
                <span className="font-bold">
                  {classificationOptions.find(opt => opt.id === selectedClassification)?.name}
                </span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserClassification;
