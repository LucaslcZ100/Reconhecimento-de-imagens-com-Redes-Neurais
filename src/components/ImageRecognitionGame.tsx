
import React, { useState, useEffect, useRef } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Trophy, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GameResult {
  label: string;
  score: number;
}

const ImageRecognitionGame = () => {
  const [classifier, setClassifier] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<string>('');
  const [predictions, setPredictions] = useState<GameResult[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Imagens de exemplo para o jogo
  const sampleImages = [
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=400&fit=crop'
  ];

  useEffect(() => {
    initializeClassifier();
  }, []);

  const initializeClassifier = async () => {
    try {
      console.log('Inicializando classificador de imagens...');
      const imageClassifier = await pipeline(
        'image-classification',
        'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k'
      );
      setClassifier(imageClassifier);
      setIsLoading(false);
      console.log('Classificador inicializado com sucesso!');
    } catch (error) {
      console.error('Erro ao inicializar classificador:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o modelo de IA. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const startNewRound = async () => {
    if (!classifier) return;

    setIsProcessing(true);
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setCurrentImage(randomImage);

    try {
      console.log('Analisando imagem:', randomImage);
      const results = await classifier(randomImage);
      console.log('Resultados da análise:', results);

      const topPredictions = results.slice(0, 3);
      setPredictions(topPredictions);

      // Criar opções incluindo a resposta correta e algumas incorretas
      const correctAnswer = topPredictions[0].label;
      const wrongOptions = [
        'gato doméstico',
        'cachorro',
        'pássaro',
        'carro',
        'árvore',
        'casa',
        'pessoa',
        'comida'
      ].filter(option => !correctAnswer.toLowerCase().includes(option.toLowerCase()));

      const gameOptions = [
        correctAnswer,
        ...wrongOptions.slice(0, 2)
      ].sort(() => Math.random() - 0.5);

      setOptions(gameOptions);
      setGameRound(prev => prev + 1);
      setIsProcessing(false);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      setIsProcessing(false);
      toast({
        title: "Erro",
        description: "Erro ao processar a imagem. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleAnswer = (selectedOption: string) => {
    if (predictions.length === 0) return;

    const correctAnswer = predictions[0].label;
    const isCorrect = selectedOption === correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "Correto! 🎉",
        description: `Você ganhou 10 pontos! A IA identificou: ${correctAnswer}`,
      });
    } else {
      toast({
        title: "Incorreto 😅",
        description: `A resposta correta era: ${correctAnswer}`,
        variant: "destructive"
      });
    }

    // Iniciar nova rodada após um pequeno delay
    setTimeout(() => {
      startNewRound();
    }, 2000);
  };

  const resetGame = () => {
    setScore(0);
    setGameRound(0);
    setPredictions([]);
    setOptions([]);
    setCurrentImage('');
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    startNewRound();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <Card className="w-96 text-center">
          <CardContent className="pt-6">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2">Carregando IA...</h2>
            <p className="text-gray-600">Inicializando o modelo de reconhecimento de imagens</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            🤖 Jogo de Reconhecimento de Imagens
          </h1>
          <p className="text-gray-600 text-lg">
            A IA vai analisar uma imagem e você deve adivinhar o que ela identificou!
          </p>
        </div>

        {/* Score and Stats */}
        <div className="flex justify-center gap-4 mb-6">
          <Badge variant="secondary" className="text-lg px-4 py-2">
            <Trophy className="h-5 w-5 mr-2" />
            Pontos: {score}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Rodada: {gameRound}
          </Badge>
        </div>

        {!gameStarted ? (
          /* Start Screen */
          <Card className="max-w-md mx-auto text-center">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Camera className="h-6 w-6" />
                Pronto para jogar?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Clique em "Iniciar Jogo" para começar a diversão com reconhecimento de imagens por IA!
              </p>
              <Button onClick={startGame} size="lg" className="w-full">
                Iniciar Jogo
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Game Screen */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Display */}
            <Card>
              <CardHeader>
                <CardTitle>Imagem Atual</CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  </div>
                ) : currentImage ? (
                  <img
                    src={currentImage}
                    alt="Imagem para reconhecimento"
                    className="w-full aspect-square object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Game Options */}
            <Card>
              <CardHeader>
                <CardTitle>O que a IA identificou na imagem?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isProcessing ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
                    <p>A IA está analisando a imagem...</p>
                  </div>
                ) : options.length > 0 ? (
                  <div className="space-y-3">
                    {options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full text-left justify-start hover:bg-blue-50 transition-colors"
                        onClick={() => handleAnswer(option)}
                      >
                        {option}
                      </Button>
                    ))}
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

        {/* AI Predictions Display */}
        {predictions.length > 0 && gameStarted && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Análise Detalhada da IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {predictions.map((prediction, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{prediction.label}</span>
                    <Badge variant={index === 0 ? "default" : "secondary"}>
                      {(prediction.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
