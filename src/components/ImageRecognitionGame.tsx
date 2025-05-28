
import React, { useState, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Play, RotateCcw, Loader2, Circle, RectangleHorizontal, Triangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameResult {
  label: string;
  score: number;
}

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  keywords: string[];
  icon: React.ReactNode;
  color: string;
}

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
}

const ImageRecognitionGame = () => {
  const [classifier, setClassifier] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEmoji, setCurrentEmoji] = useState<EmojiItem | null>(null);
  const [predictions, setPredictions] = useState<GameResult[]>([]);
  const [score, setScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [correctShape, setCorrectShape] = useState<string>('');
  const { toast } = useToast();

  // Emojis educacionais com categorias
  const emojiItems: EmojiItem[] = [
    // Círculo - Seres Vivos
    { emoji: '🐱', name: 'gato', category: 'circle' },
    { emoji: '🐶', name: 'cachorro', category: 'circle' },
    { emoji: '🐴', name: 'cavalo', category: 'circle' },
    { emoji: '🐵', name: 'macaco', category: 'circle' },
    { emoji: '🐯', name: 'tigre', category: 'circle' },
    { emoji: '🐘', name: 'elefante', category: 'circle' },
    { emoji: '👤', name: 'pessoa', category: 'circle' },
    { emoji: '🦅', name: 'pássaro', category: 'circle' },
    
    // Retângulo - Objetos
    { emoji: '🚗', name: 'carro', category: 'rectangle' },
    { emoji: '🏠', name: 'casa', category: 'rectangle' },
    { emoji: '📱', name: 'telefone', category: 'rectangle' },
    { emoji: '💻', name: 'computador', category: 'rectangle' },
    { emoji: '🍕', name: 'pizza', category: 'rectangle' },
    { emoji: '📚', name: 'livro', category: 'rectangle' },
    { emoji: '🎮', name: 'videogame', category: 'rectangle' },
    { emoji: '⌚', name: 'relógio', category: 'rectangle' },
    
    // Triângulo - Natureza
    { emoji: '🏔️', name: 'montanha', category: 'triangle' },
    { emoji: '🌲', name: 'árvore', category: 'triangle' },
    { emoji: '🌸', name: 'flor', category: 'triangle' },
    { emoji: '🍃', name: 'folha', category: 'triangle' },
    { emoji: '⛰️', name: 'pedra', category: 'triangle' },
    { emoji: '🌵', name: 'cacto', category: 'triangle' },
    { emoji: '🌾', name: 'planta', category: 'triangle' },
    { emoji: '🍄', name: 'cogumelo', category: 'triangle' }
  ];

  // Categorias de formas geométricas
  const shapeCategories: ShapeCategory[] = [
    {
      shape: 'circle',
      name: 'Círculo - Seres Vivos',
      keywords: ['cat', 'dog', 'horse', 'animal', 'bird', 'person', 'face', 'monkey', 'tiger', 'elephant'],
      icon: <Circle className="h-8 w-8" />,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos',
      keywords: ['car', 'vehicle', 'building', 'house', 'phone', 'computer', 'food', 'plate', 'book', 'table'],
      icon: <RectangleHorizontal className="h-8 w-8" />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Natureza',
      keywords: ['mountain', 'tree', 'plant', 'flower', 'landscape', 'sky', 'cloud', 'rock', 'stone', 'leaf'],
      icon: <Triangle className="h-8 w-8" />,
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  useEffect(() => {
    // Para este jogo com emojis, não precisamos da IA de classificação de imagens
    // Vamos simular o carregamento e depois usar classificação baseada nos emojis
    const simulateLoading = async () => {
      console.log('🎮 Preparando o jogo...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      console.log('✅ Jogo pronto!');
    };
    
    simulateLoading();
  }, []);

  const startNewRound = async () => {
    setIsProcessing(true);
    setSelectedShape('');
    
    // Selecionar emoji aleatório
    const randomEmoji = emojiItems[Math.floor(Math.random() * emojiItems.length)];
    setCurrentEmoji(randomEmoji);
    
    // Simular "análise da IA" com resultados baseados no emoji
    console.log('🔍 Analisando emoji:', randomEmoji.emoji);
    
    // Criar predições simuladas baseadas no emoji
    const mainPrediction = { label: randomEmoji.name, score: 0.85 + Math.random() * 0.1 };
    const secondaryPredictions = [
      { label: 'objeto genérico', score: 0.1 + Math.random() * 0.05 },
      { label: 'item comum', score: 0.05 + Math.random() * 0.03 }
    ];
    
    const allPredictions = [mainPrediction, ...secondaryPredictions];
    setPredictions(allPredictions);
    
    // Definir a forma correta baseada na categoria do emoji
    setCorrectShape(randomEmoji.category);
    
    setGameRound(prev => prev + 1);
    setIsProcessing(false);
    
    console.log('📊 Resultados da análise:', allPredictions);
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
        title: "🎉 Correto!",
        description: `Parabéns! "${currentEmoji?.name}" pertence à categoria ${correctCategory?.name}`,
      });
    } else {
      toast({
        title: "📚 Tente novamente!",
        description: `"${currentEmoji?.name}" pertence à categoria ${correctCategory?.name}, não ${selectedCategory?.name}`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      startNewRound();
    }, 3000);
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
  };

  const startGame = () => {
    setGameStarted(true);
    setShowExplanation(false);
    startNewRound();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-96 text-center">
          <CardContent className="pt-6">
            <Brain className="h-16 w-16 animate-pulse mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Preparando o Jogo</h2>
            <p className="text-gray-600">Carregando classificador de emojis...</p>
            <div className="mt-4">
              <Loader2 className="h-6 w-6 animate-spin mx-auto text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Educacional */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🧠 Jogo de Classificação por Formas Geométricas
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Veja o emoji e classifique-o usando formas geométricas!
          </p>
        </div>

        {/* Explicação Educacional */}
        {showExplanation && !gameStarted && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Brain className="h-6 w-6" />
                Como Funciona o Jogo?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <div className="space-y-3">
                <p>🎯 <strong>Objetivo:</strong> Classifique emojis usando formas geométricas</p>
                <p>🔵 <strong>Círculo:</strong> Representa seres vivos (pessoas, animais)</p>
                <p>🔲 <strong>Retângulo:</strong> Representa objetos feitos pelo homem</p>
                <p>🔺 <strong>Triângulo:</strong> Representa elementos da natureza</p>
                <p>🏆 <strong>Pontuação:</strong> Ganhe 10 pontos por resposta correta!</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Placar */}
        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="default" className="text-lg px-6 py-2 bg-green-100 text-green-800">
            🏆 Pontos: {score}
          </Badge>
          {gameStarted && (
            <Badge variant="outline" className="text-lg px-6 py-2">
              🎮 Rodada: {gameRound}
            </Badge>
          )}
        </div>

        {!gameStarted ? (
          /* Tela Inicial */
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Play className="h-8 w-8 text-green-600" />
                Pronto para Classificar?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 text-lg">
                Vamos classificar emojis usando formas geométricas!
              </p>
              <Button onClick={startGame} size="lg" className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">
                🚀 Começar o Jogo
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Tela do Jogo */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Display do Emoji */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">🎯 Emoji para Classificação</CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                    <Brain className="h-16 w-16 animate-pulse text-blue-500 mb-4" />
                    <p className="text-lg font-medium">Analisando...</p>
                  </div>
                ) : currentEmoji ? (
                  <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex flex-col items-center justify-center shadow-inner">
                    <div className="text-9xl mb-4">{currentEmoji.emoji}</div>
                    <p className="text-2xl font-bold text-gray-700 capitalize">{currentEmoji.name}</p>
                  </div>
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Brain className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Classificação por Formas */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">🔍 Escolha a forma geométrica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isProcessing ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
                    <p className="text-lg">Processando...</p>
                  </div>
                ) : predictions.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-center text-gray-600 mb-4">
                      Escolha a forma geométrica que melhor representa este emoji:
                    </p>
                    
                    <RadioGroup 
                      value={selectedShape} 
                      onValueChange={handleShapeSelection}
                      disabled={selectedShape !== ''}
                      className="space-y-4"
                    >
                      {shapeCategories.map((category) => (
                        <div key={category.shape} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                          <RadioGroupItem 
                            value={category.shape} 
                            id={category.shape}
                            disabled={selectedShape !== ''}
                          />
                          <Label 
                            htmlFor={category.shape} 
                            className="flex items-center gap-3 cursor-pointer text-lg flex-1"
                          >
                            {category.icon}
                            <span>{category.name}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500">
                    Aguardando nova rodada...
                  </p>
                )}

                <div className="pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={resetGame}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar Jogo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Análise Detalhada */}
        {predictions.length > 0 && gameStarted && (
          <Card className="mt-6 bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">🔬 Análise do Emoji</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 mb-4">
                Classificação detectada:
              </p>
              <div className="space-y-3">
                {predictions.map((prediction, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-medium capitalize">{prediction.label}</span>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-lg">
                      {(prediction.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
              {correctShape && (
                <p className="text-sm text-purple-600 mt-4">
                  💡 Este emoji pertence à categoria da forma: {
                    shapeCategories.find(cat => cat.shape === correctShape)?.name
                  }
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
