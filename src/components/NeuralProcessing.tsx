
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Loader2, Brain, Heart, Lightbulb, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NetworkLayer {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

interface GameResult {
  label: string;
  score: number;
}

interface NeuralProcessingProps {
  currentStep: 'input' | 'analysis' | 'classification';
  networkLayers: NetworkLayer[];
  predictions: GameResult[];
}

const NeuralProcessing = ({ currentStep, networkLayers, predictions }: NeuralProcessingProps) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(0);
  const [showThought, setShowThought] = useState('');

  const humanAnalysis = [
    { 
      step: "Primeira Impressão", 
      icon: <Eye className="h-5 w-5" />,
      thought: "Hmm, deixe-me dar uma olhada...",
      description: "Como quando você olha rapidamente para algo"
    },
    { 
      step: "Análise Detalhada", 
      icon: <Brain className="h-5 w-5" />,
      thought: "Interessante! Vejo algumas formas...",
      description: "Prestando atenção aos detalhes"
    },
    { 
      step: "Conexão de Memórias", 
      icon: <Heart className="h-5 w-5" />,
      thought: "Isso me lembra de algo...",
      description: "Comparando com experiências passadas"
    },
    { 
      step: "Momento Eureka", 
      icon: <Lightbulb className="h-5 w-5" />,
      thought: "Ah! Agora entendi!",
      description: "Quando tudo faz sentido"
    }
  ];

  useEffect(() => {
    if (currentStep === 'analysis') {
      const interval = setInterval(() => {
        setCurrentAnalysis(prev => {
          const next = (prev + 1) % humanAnalysis.length;
          setShowThought(humanAnalysis[next].thought);
          return next;
        });
      }, 800);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  return (
    <Card className="bg-white shadow-lg border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-600" />
          🔬 Processamento Neural
        </CardTitle>
        <p className="text-sm text-gray-600">Como meu cérebro artificial pensa</p>
      </CardHeader>
      <CardContent className="p-6">
        {currentStep === 'input' && (
          <div className="text-center py-8">
            <div className="relative">
              <Eye className="h-12 w-12 animate-pulse mx-auto mb-4 text-purple-500" />
              <Sparkles className="h-6 w-6 absolute -top-2 -right-2 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-lg mb-2">Preparando para pensar...</p>
            <p className="text-sm text-gray-500">Assim como você, preciso me concentrar primeiro</p>
          </div>
        )}
        
        {currentStep === 'analysis' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Brain className="h-12 w-12 text-purple-500 mx-auto mb-2" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="bg-purple-100 rounded-lg p-3 mb-4 border border-purple-200">
                <p className="font-medium text-purple-800 italic">💭 "{showThought}"</p>
              </div>
            </div>

            <div className="space-y-3">
              {humanAnalysis.map((analysis, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-500 ${
                    index === currentAnalysis 
                      ? 'bg-purple-100 border-2 border-purple-300 scale-105' 
                      : index < currentAnalysis 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    index === currentAnalysis 
                      ? 'bg-purple-500 text-white animate-pulse' 
                      : index < currentAnalysis 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-300 text-gray-500'
                  }`}>
                    {analysis.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{analysis.step}</p>
                    <p className="text-xs text-gray-600">{analysis.description}</p>
                  </div>
                  {index < currentAnalysis && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      ✓ Concluído
                    </Badge>
                  )}
                  {index === currentAnalysis && (
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800 text-xs animate-pulse">
                      🤔 Pensando...
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentStep === 'classification' && predictions.length > 0 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="relative inline-block">
                <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                <div className="absolute -top-1 -right-1 text-2xl">💡</div>
              </div>
              <p className="font-medium text-green-700 text-lg">
                ✨ Eureka! Descobri o que é!
              </p>
              <p className="text-sm text-gray-600">Minha confiança em cada possibilidade:</p>
            </div>
            
            <div className="space-y-3">
              {predictions.map((prediction, index) => (
                <div key={index} className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                  index === 0 
                    ? 'bg-green-50 border-green-300 hover:bg-green-100' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}>
                  <div className="flex items-center gap-3">
                    {index === 0 && <span className="text-2xl">🎯</span>}
                    {index === 1 && <span className="text-2xl">🤔</span>}
                    {index === 2 && <span className="text-2xl">💭</span>}
                    <span className="font-medium capitalize">{prediction.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-20 h-2 rounded-full overflow-hidden ${
                      index === 0 ? 'bg-green-200' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          index === 0 ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${prediction.score * 100}%` }}
                      ></div>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"} className={
                      index === 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }>
                      {(prediction.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
              <p className="text-sm text-blue-800">
                <span className="font-medium">💡 Como pensei:</span> Assim como você reconhece um amigo na multidão, 
                eu comparo padrões que aprendi com milhões de exemplos!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralProcessing;
