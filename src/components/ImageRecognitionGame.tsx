
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Play, RotateCcw, Loader2, Circle, RectangleHorizontal, Triangle, Eye, Layers, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameResult {
  label: string;
  score: number;
}

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  description: string;
  keywords: string[];
  icon: React.ReactNode;
  color: string;
}

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
  features: string[];
}

interface NetworkLayer {
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const ImageRecognitionGame = () => {
  const [currentEmoji, setCurrentEmoji] = useState<EmojiItem | null>(null);
  const [predictions, setPredictions] = useState<GameResult[]>([]);
  const [score, setScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [correctShape, setCorrectShape] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<'input' | 'analysis' | 'classification'>('input');
  const [networkLayers, setNetworkLayers] = useState<NetworkLayer[]>([]);
  const { toast } = useToast();

  // Emojis educacionais com características extraídas
  const emojiItems: EmojiItem[] = [
    // Círculo - Seres Vivos
    { emoji: '🐱', name: 'gato', category: 'circle', features: ['olhos', 'orelhas', 'focinho', 'pelo'] },
    { emoji: '🐶', name: 'cachorro', category: 'circle', features: ['olhos', 'orelhas', 'focinho', 'cauda'] },
    { emoji: '🐴', name: 'cavalo', category: 'circle', features: ['olhos', 'orelhas', 'crina', 'pernas'] },
    { emoji: '🐵', name: 'macaco', category: 'circle', features: ['olhos', 'orelhas', 'rosto', 'braços'] },
    { emoji: '👤', name: 'pessoa', category: 'circle', features: ['olhos', 'nariz', 'boca', 'cabelo'] },
    
    // Retângulo - Objetos
    { emoji: '🚗', name: 'carro', category: 'rectangle', features: ['rodas', 'janelas', 'porta', 'metal'] },
    { emoji: '🏠', name: 'casa', category: 'rectangle', features: ['telhado', 'janelas', 'porta', 'paredes'] },
    { emoji: '📱', name: 'telefone', category: 'rectangle', features: ['tela', 'botões', 'bordas', 'retangular'] },
    { emoji: '💻', name: 'computador', category: 'rectangle', features: ['tela', 'teclado', 'bordas', 'plástico'] },
    { emoji: '📚', name: 'livro', category: 'rectangle', features: ['páginas', 'capa', 'bordas', 'retangular'] },
    
    // Triângulo - Natureza
    { emoji: '🏔️', name: 'montanha', category: 'triangle', features: ['pico', 'encosta', 'pedra', 'altura'] },
    { emoji: '🌲', name: 'árvore', category: 'triangle', features: ['tronco', 'galhos', 'folhas', 'copa'] },
    { emoji: '🌸', name: 'flor', category: 'triangle', features: ['pétalas', 'caule', 'cores', 'orgânica'] },
    { emoji: '🍃', name: 'folha', category: 'triangle', features: ['nervuras', 'verde', 'orgânica', 'forma'] },
    { emoji: '⛰️', name: 'montanha rochosa', category: 'triangle', features: ['pedras', 'pico', 'irregular', 'natural'] }
  ];

  // Categorias de formas geométricas expandidas
  const shapeCategories: ShapeCategory[] = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      description: 'Representa organismos vivos com características orgânicas e curvas naturais',
      keywords: ['olhos', 'orelhas', 'focinho', 'rosto', 'pelo', 'pele'],
      icon: <Circle className="h-8 w-8" />,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos Manufaturados',
      description: 'Representa objetos criados pelo homem com formas regulares e geométricas',
      keywords: ['bordas', 'tela', 'janelas', 'porta', 'metal', 'plástico'],
      icon: <RectangleHorizontal className="h-8 w-8" />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Elementos Naturais',
      description: 'Representa elementos da natureza com formas irregulares e orgânicas',
      keywords: ['pico', 'tronco', 'galhos', 'pétalas', 'pedras', 'natural'],
      icon: <Triangle className="h-8 w-8" />,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const startNewRound = async () => {
    setIsProcessing(true);
    setSelectedShape('');
    setCurrentStep('input');
    
    // Selecionar emoji aleatório
    const randomEmoji = emojiItems[Math.floor(Math.random() * emojiItems.length)];
    setCurrentEmoji(randomEmoji);
    
    console.log('🔍 Iniciando análise de rede neural para:', randomEmoji.emoji);
    
    // Simular processo de rede neural em camadas
    setTimeout(() => {
      setCurrentStep('analysis');
      
      // Simular extração de características das camadas da rede neural
      const layers: NetworkLayer[] = [
        {
          name: 'Camada de Entrada',
          description: 'Recebe a imagem e converte em dados numéricos',
          icon: <Eye className="h-5 w-5" />,
          features: ['pixels', 'cores', 'brilho', 'contraste']
        },
        {
          name: 'Camadas Convolucionais',
          description: 'Detecta características básicas como bordas e formas',
          icon: <Layers className="h-5 w-5" />,
          features: randomEmoji.features.slice(0, 2)
        },
        {
          name: 'Camadas Intermediárias',
          description: 'Combina características para formar padrões mais complexos',
          icon: <Brain className="h-5 w-5" />,
          features: randomEmoji.features.slice(2)
        },
        {
          name: 'Camada de Saída',
          description: 'Classifica o objeto com base nos padrões identificados',
          icon: <Zap className="h-5 w-5" />,
          features: [randomEmoji.name]
        }
      ];
      
      setNetworkLayers(layers);
      
      setTimeout(() => {
        setCurrentStep('classification');
        
        // Criar predições baseadas no emoji
        const mainPrediction = { label: randomEmoji.name, score: 0.85 + Math.random() * 0.1 };
        const secondaryPredictions = [
          { label: 'objeto similar', score: 0.1 + Math.random() * 0.05 },
          { label: 'categoria relacionada', score: 0.05 + Math.random() * 0.03 }
        ];
        
        const allPredictions = [mainPrediction, ...secondaryPredictions];
        setPredictions(allPredictions);
        setCorrectShape(randomEmoji.category);
        setGameRound(prev => prev + 1);
        setIsProcessing(false);
        
        console.log('📊 Classificação completa:', allPredictions);
      }, 2000);
    }, 1500);
  };

  const handleShapeSelection = (shape: string) => {
    if (selectedShape !== '') return;
    
    setSelectedShape(shape);
    
    const isCorrect = shape === correctShape;
    const selectedCategory = shapeCategories.find(cat => cat.shape === shape);
    const correctCategory = shapeCategories.find(cat => cat.shape === correctShape);

    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "🎉 Classificação Correta!",
        description: `Excelente! A rede neural identificou "${currentEmoji?.name}" como ${correctCategory?.name}`,
      });
    } else {
      toast({
        title: "🤖 Análise da Rede Neural",
        description: `A rede classificou "${currentEmoji?.name}" como ${correctCategory?.name}. ${selectedCategory?.name} tem características diferentes.`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      startNewRound();
    }, 4000);
  };

  const resetGame = () => {
    setScore(0);
    setGameRound(0);
    setPredictions([]);
    setCurrentEmoji(null);
    setGameStarted(false);
    setShowExplanation(true);
    setSelectedShape('');
    setCorrectShape('');
    setCurrentStep('input');
    setNetworkLayers([]);
  };

  const startGame = () => {
    setGameStarted(true);
    setShowExplanation(false);
    startNewRound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Educacional */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🧠 Reconhecimento de Imagens com Redes Neurais
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Descubra como os computadores "veem" e classificam objetos usando inteligência artificial
          </p>
          <Badge variant="outline" className="mt-2 text-sm">
            Nível: Médio | Público: Estudantes e Educadores
          </Badge>
        </div>

        {/* Explicação Educacional */}
        {showExplanation && !gameStarted && (
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
        )}

        {/* Placar */}
        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="default" className="text-lg px-6 py-2 bg-green-100 text-green-800">
            🏆 Pontos: {score}
          </Badge>
          {gameStarted && (
            <Badge variant="outline" className="text-lg px-6 py-2">
              🎮 Análise: {gameRound}
            </Badge>
          )}
        </div>

        {!gameStarted ? (
          /* Tela Inicial */
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
              <Button onClick={startGame} size="lg" className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">
                🚀 Começar Análise
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Tela do Jogo */
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Display do Emoji */}
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

            {/* Processamento da Rede Neural */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">🔬 Processamento Neural</CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === 'input' && (
                  <div className="text-center py-8">
                    <Eye className="h-12 w-12 animate-pulse mx-auto mb-4 text-blue-500" />
                    <p className="text-lg">Recebendo entrada...</p>
                  </div>
                )}
                
                {currentStep === 'analysis' && (
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-500" />
                      <p className="font-medium">Processando camadas neurais...</p>
                    </div>
                    {networkLayers.map((layer, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {layer.icon}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{layer.name}</p>
                          <p className="text-xs text-gray-600 mb-2">{layer.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {layer.features.map((feature, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {currentStep === 'classification' && predictions.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-center font-medium text-green-700 mb-4">
                      ✅ Análise Completa!
                    </p>
                    {predictions.map((prediction, index) => (
                      <div key={index} className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                        <span className="font-medium capitalize">{prediction.label}</span>
                        <Badge variant={index === 0 ? "default" : "secondary"} className="bg-green-100 text-green-800">
                          {(prediction.score * 100).toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Classificação Final */}
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
                      onValueChange={handleShapeSelection}
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
                    onClick={resetGame}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar Simulação
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Características Detectadas */}
        {currentEmoji && currentStep === 'classification' && (
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
                    {shapeCategories.find(cat => cat.shape === correctShape)?.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
