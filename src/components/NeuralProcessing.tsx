
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Loader2, Brain, Heart, Lightbulb, Sparkles, Zap, Layers, Network, Cpu } from 'lucide-react';
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
  isDarkTheme: boolean;
}

const NeuralProcessing = ({ currentStep, networkLayers, predictions, isDarkTheme }: NeuralProcessingProps) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(0);
  const [showThought, setShowThought] = useState('');
  const [neuronActivity, setNeuronActivity] = useState<number[]>([]);

  const humanAnalysis = [
    { 
      step: "Primeira Impressão", 
      icon: <Eye className="h-5 w-5" />,
      thought: "Hmm, deixe-me dar uma olhada...",
      description: "Como quando você olha rapidamente para algo",
      neurons: 32
    },
    { 
      step: "Análise Detalhada", 
      icon: <Brain className="h-5 w-5" />,
      thought: "Interessante! Vejo algumas formas...",
      description: "Prestando atenção aos detalhes",
      neurons: 64
    },
    { 
      step: "Conexão de Memórias", 
      icon: <Heart className="h-5 w-5" />,
      thought: "Isso me lembra de algo...",
      description: "Comparando com experiências passadas",
      neurons: 128
    },
    { 
      step: "Processamento Profundo", 
      icon: <Network className="h-5 w-5" />,
      thought: "Analisando padrões complexos...",
      description: "Camadas profundas ativando",
      neurons: 256
    },
    { 
      step: "Refinamento Neural", 
      icon: <Cpu className="h-5 w-5" />,
      thought: "Refinando a análise...",
      description: "Ajustando pesos neurais",
      neurons: 512
    },
    { 
      step: "Momento Eureka", 
      icon: <Lightbulb className="h-5 w-5" />,
      thought: "Ah! Agora entendi!",
      description: "Quando tudo faz sentido",
      neurons: 1024
    }
  ];

  useEffect(() => {
    if (currentStep === 'analysis') {
      const interval = setInterval(() => {
        setCurrentAnalysis(prev => {
          const next = (prev + 1) % humanAnalysis.length;
          setShowThought(humanAnalysis[next].thought);
          
          // Simular atividade neural crescente
          const newActivity = Array.from({ length: humanAnalysis[next].neurons }, () => Math.random());
          setNeuronActivity(newActivity);
          
          return next;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [currentStep]);

  const renderNeuronGrid = (count: number) => {
    const gridSize = Math.min(Math.ceil(Math.sqrt(count)), 20);
    const displayCount = Math.min(count, 400);
    
    return (
      <div className="grid gap-1 p-4" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {Array.from({ length: displayCount }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              neuronActivity[index] > 0.7 
                ? 'bg-orange-400 shadow-lg animate-pulse' 
                : neuronActivity[index] > 0.4 
                  ? 'bg-yellow-400' 
                  : 'bg-yellow-600 opacity-60'
            }`}
            style={{
              animationDelay: `${index * 10}ms`,
              transform: neuronActivity[index] > 0.8 ? 'scale(1.3)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="shadow-xl border-3 transition-all duration-300 bg-black border-orange-500 hover:border-orange-400 text-orange-100">
      <CardHeader className="bg-gradient-to-r from-orange-900 to-yellow-900 border-b-2 border-orange-600">
        <CardTitle className="text-xl flex items-center gap-2 text-orange-300">
          <Brain className="h-6 w-6" />
          🔬 Processamento Neural Avançado
        </CardTitle>
        <p className="text-sm text-yellow-200">
          Como meu cérebro artificial pensa - {currentStep === 'analysis' ? `${humanAnalysis[currentAnalysis]?.neurons || 0} neurônios ativos` : 'Sistema neural complexo'}
        </p>
      </CardHeader>
      <CardContent className="p-6 bg-black">
        {currentStep === 'input' && (
          <div className="text-center py-8">
            <div className="relative">
              <Eye className="h-12 w-12 animate-pulse mx-auto mb-4 text-orange-400" />
              <Sparkles className="h-6 w-6 absolute -top-2 -right-2 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-lg mb-2 text-orange-200">
              Preparando neurônios para análise...
            </p>
            <p className="text-sm text-yellow-300">
              Inicializando 2.048 neurônios em 12 camadas
            </p>
            {renderNeuronGrid(64)}
          </div>
        )}
        
        {currentStep === 'analysis' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <Brain className="h-12 w-12 mx-auto mb-2 text-orange-400" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-ping"></div>
              </div>
              <div className="rounded-lg p-3 mb-4 border bg-orange-900 border-orange-600">
                <p className="font-medium italic text-orange-200">
                  💭 "{showThought}"
                </p>
                <p className="text-xs text-yellow-300 mt-1">
                  Neurônios ativos: {humanAnalysis[currentAnalysis]?.neurons || 0}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {humanAnalysis.map((analysis, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-4 rounded-lg transition-all duration-500 border-2 ${
                    index === currentAnalysis 
                      ? 'bg-orange-900 border-orange-400 scale-105 shadow-lg shadow-orange-500/30' 
                      : index < currentAnalysis 
                        ? 'bg-yellow-900 border-yellow-500' 
                        : 'bg-yellow-800 border-yellow-600'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    index === currentAnalysis 
                      ? 'bg-orange-500 text-black animate-pulse' 
                      : index < currentAnalysis 
                        ? 'bg-yellow-500 text-black' 
                        : 'bg-yellow-600 text-yellow-200'
                  }`}>
                    {analysis.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-orange-200">{analysis.step}</p>
                    <p className="text-xs text-yellow-300">
                      {analysis.description} • {analysis.neurons} neurônios
                    </p>
                  </div>
                  {index < currentAnalysis && (
                    <Badge variant="secondary" className="bg-yellow-600 text-black text-xs">
                      ✓ Concluído
                    </Badge>
                  )}
                  {index === currentAnalysis && (
                    <Badge variant="secondary" className="bg-orange-700 text-orange-200 text-xs animate-pulse">
                      🔥 Processando...
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {/* Grade de neurônios ativos */}
            <div className="mt-6 p-4 bg-yellow-900 rounded-lg border border-yellow-600">
              <p className="text-sm text-yellow-200 mb-2 text-center">
                Atividade Neural em Tempo Real - {humanAnalysis[currentAnalysis]?.neurons || 0} neurônios
              </p>
              {renderNeuronGrid(humanAnalysis[currentAnalysis]?.neurons || 64)}
            </div>
          </div>
        )}
        
        {currentStep === 'classification' && predictions.length > 0 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="relative inline-block">
                <Lightbulb className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                <div className="absolute -top-1 -right-1 text-2xl">🔥</div>
              </div>
              <p className="font-medium text-lg text-orange-300">
                ✨ Resultado Neural Completo!
              </p>
              <p className="text-sm text-yellow-200">
                Processamento finalizado com 1.024 neurônios de saída
              </p>
            </div>
            
            <div className="space-y-3">
              {predictions.map((prediction, index) => (
                <div key={index} className={`flex justify-between items-center p-4 rounded-lg border-2 transition-all duration-300 ${
                  index === 0 
                    ? 'bg-orange-900 border-orange-400 hover:bg-orange-800' 
                    : 'bg-yellow-800 border-yellow-600 hover:bg-yellow-700'
                }`}>
                  <div className="flex items-center gap-3">
                    {index === 0 && <span className="text-2xl">🎯</span>}
                    {index === 1 && <span className="text-2xl">🤔</span>}
                    {index === 2 && <span className="text-2xl">💭</span>}
                    <span className="font-medium capitalize text-orange-200">{prediction.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-20 h-2 rounded-full overflow-hidden ${
                      index === 0 ? 'bg-orange-600' : 'bg-yellow-700'
                    }`}>
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          index === 0 ? 'bg-orange-400' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${prediction.score * 100}%` }}
                      ></div>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"} className={
                      index === 0 
                        ? "bg-orange-600 text-black" 
                        : "bg-yellow-700 text-yellow-200"
                    }>
                      {(prediction.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 rounded-lg border mt-4 bg-orange-900 border-orange-600">
              <p className="text-sm text-orange-200">
                <span className="font-medium">🧠 Análise Neural Completa:</span> Assim como você reconhece um amigo na multidão, 
                eu comparo padrões com milhões de neurônios trabalhando em paralelo!
              </p>
            </div>

            {/* Visualização final dos neurônios */}
            <div className="mt-4 p-4 bg-yellow-900 rounded-lg border border-yellow-600">
              <p className="text-sm text-yellow-200 mb-2 text-center">
                Resultado Final - 1.024 Neurônios de Classificação
              </p>
              {renderNeuronGrid(1024)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NeuralProcessing;
