
import React, { useState, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const ImageRecognitionGame = () => {
  const [classifier, setClassifier] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [predictions, setPredictions] = useState<GameResult[]>([]);
  const [score, setScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [selectedShape, setSelectedShape] = useState<string>('');
  const [correctShape, setCorrectShape] = useState<string>('');
  const { toast } = useToast();

  // Imagens educacionais com categorias claras
  const educationalImages = [
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', // gato
    'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=400&fit=crop', // cavalo
    'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop', // macaco
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', // comida
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop', // cervo
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop', // gato
    'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=400&h=400&fit=crop', // pessoa
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', // carro
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop', // montanha
  ];

  // Categorias de formas geométricas baseadas no que a IA identifica
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
    initializeClassifier();
  }, []);

  const initializeClassifier = async () => {
    try {
      console.log('🤖 Inicializando a rede neural...');
      const imageClassifier = await pipeline(
        'image-classification',
        'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k'
      );
      setClassifier(imageClassifier);
      setIsLoading(false);
      console.log('✅ Rede neural carregada!');
    } catch (error) {
      console.error('❌ Erro ao carregar a rede neural:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a rede neural. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const determineCorrectShape = (topPrediction: string): string => {
    const prediction = topPrediction.toLowerCase();
    
    for (const category of shapeCategories) {
      if (category.keywords.some(keyword => prediction.includes(keyword))) {
        return category.shape;
      }
    }
    
    // Fallback para círculo se não encontrar correspondência
    return 'circle';
  };

  const startNewRound = async () => {
    if (!classifier) return;

    setIsProcessing(true);
    setSelectedShape('');
    const randomImage = educationalImages[Math.floor(Math.random() * educationalImages.length)];
    setCurrentImage(randomImage);

    try {
      console.log('🔍 A IA está analisando a imagem...');
      const results = await classifier(randomImage);
      console.log('📊 Resultados da análise:', results);

      const topPredictions = results.slice(0, 3);
      setPredictions(topPredictions);

      // Determinar a forma correta baseada na predição principal
      const correctShapeForImage = determineCorrectShape(topPredictions[0].label);
      setCorrectShape(correctShapeForImage);

      setGameRound(prev => prev + 1);
      setIsProcessing(false);
    } catch (error) {
      console.error('❌ Erro ao processar imagem:', error);
      setIsProcessing(false);
      toast({
        title: "Erro",
        description: "Erro ao processar a imagem. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleShapeSelection = (shape: string) => {
    setSelectedShape(shape);
    
    const isCorrect = shape === correctShape;
    const selectedCategory = shapeCategories.find(cat => cat.shape === shape);
    const correctCategory = shapeCategories.find(cat => cat.shape === correctShape);

    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "🎉 Correto!",
        description: `Parabéns! A IA identificou "${predictions[0].label}" que pertence à categoria ${correctCategory?.name}`,
      });
    } else {
      toast({
        title: "📚 Tente novamente!",
        description: `A IA identificou "${predictions[0].label}" que pertence à categoria ${correctCategory?.name}, não ${selectedCategory?.name}`,
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
    setCurrentImage('');
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
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Carregando Rede Neural</h2>
            <p className="text-gray-600">Preparando a inteligência artificial para reconhecer imagens...</p>
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
            A IA analisa uma imagem e você deve classificá-la usando formas geométricas!
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
                <p>🔍 <strong>Análise da IA:</strong> A rede neural identifica o que há na imagem</p>
                <p>🔵 <strong>Círculo:</strong> Representa seres vivos (pessoas, animais)</p>
                <p>🔲 <strong>Retângulo:</strong> Representa objetos feitos pelo homem</p>
                <p>🔺 <strong>Triângulo:</strong> Representa elementos da natureza</p>
                <p>🎯 <strong>Seu Desafio:</strong> Escolha a forma que melhor representa o que a IA identificou!</p>
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
                Vamos classificar imagens usando formas geométricas!
              </p>
              <Button onClick={startGame} size="lg" className="w-full text-lg py-6 bg-green-600 hover:bg-green-700">
                🚀 Começar o Jogo
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Tela do Jogo */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Display da Imagem */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">🖼️ Imagem para Classificação</CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                    <Brain className="h-16 w-16 animate-pulse text-blue-500 mb-4" />
                    <p className="text-lg font-medium">IA Analisando...</p>
                  </div>
                ) : currentImage ? (
                  <img
                    src={currentImage}
                    alt="Imagem para a IA analisar"
                    className="w-full aspect-square object-cover rounded-lg shadow-md"
                  />
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
                <CardTitle className="text-xl">🔍 Como você classificaria?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isProcessing ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
                    <p className="text-lg">A rede neural está processando...</p>
                  </div>
                ) : predictions.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-center text-gray-600 mb-4">
                      Escolha a forma geométrica que melhor representa esta imagem:
                    </p>
                    
                    <div className="grid gap-4">
                      {shapeCategories.map((category) => (
                        <Button
                          key={category.shape}
                          variant="outline"
                          className={`h-20 text-left justify-start text-lg transition-all duration-200 hover:scale-105 ${
                            selectedShape === category.shape 
                              ? category.color + ' text-white border-transparent' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleShapeSelection(category.shape)}
                          disabled={isProcessing || selectedShape !== ''}
                        >
                          <div className="flex items-center gap-4">
                            {category.icon}
                            <span>{category.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
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

        {/* Análise Detalhada da IA */}
        {predictions.length > 0 && gameStarted && (
          <Card className="mt-6 bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800">🔬 O que a IA Identificou</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 mb-4">
                A rede neural deu estas classificações:
              </p>
              <div className="space-y-3">
                {predictions.map((prediction, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-medium">{prediction.label}</span>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-lg">
                      {(prediction.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
              {correctShape && (
                <p className="text-sm text-purple-600 mt-4">
                  💡 Baseado na identificação principal, esta imagem pertence à categoria da forma: {
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
