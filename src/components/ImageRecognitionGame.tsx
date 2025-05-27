import React, { useState, useEffect } from 'react';
import { pipeline } from '@huggingface/transformers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Play, RotateCcw, Loader2, CheckCircle, XCircle, Send } from 'lucide-react';
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
  const [showExplanation, setShowExplanation] = useState(true);
  const [userInput, setUserInput] = useState('');
  const { toast } = useToast();

  // Imagens educacionais com categorias claras
  const educationalImages = [
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop', // gato
    'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400&h=400&fit=crop', // cavalo
    'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop', // macaco
    'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop', // comida
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop', // cervo
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop' // gato
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

  const startNewRound = async () => {
    if (!classifier) return;

    setIsProcessing(true);
    setUserInput(''); // Limpar input anterior
    const randomImage = educationalImages[Math.floor(Math.random() * educationalImages.length)];
    setCurrentImage(randomImage);

    try {
      console.log('🔍 A IA está analisando a imagem...');
      const results = await classifier(randomImage);
      console.log('📊 Resultados da análise:', results);

      const topPredictions = results.slice(0, 3);
      setPredictions(topPredictions);

      // Criar opções mais simples e educacionais
      const correctAnswer = topPredictions[0].label;
      const allOptions = [
        'gato', 'cachorro', 'cavalo', 'pássaro', 'macaco', 
        'comida', 'carro', 'árvore', 'pessoa', 'casa'
      ];
      
      const wrongOptions = allOptions
        .filter(option => !correctAnswer.toLowerCase().includes(option.toLowerCase()))
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);

      const gameOptions = [correctAnswer, ...wrongOptions]
        .sort(() => Math.random() - 0.5);

      setOptions(gameOptions);
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

  const checkAnswer = (answer: string) => {
    if (predictions.length === 0) return;

    const correctAnswer = predictions[0].label.toLowerCase();
    const isCorrect = answer.toLowerCase().includes(correctAnswer.split(' ')[0]) || 
                     correctAnswer.includes(answer.toLowerCase());

    if (isCorrect) {
      setScore(prev => prev + 10);
      toast({
        title: "🎉 Correto!",
        description: `Parabéns! A IA identificou corretamente: ${predictions[0].label}`,
      });
    } else {
      toast({
        title: "📚 Tente novamente!",
        description: `A IA identificou: ${predictions[0].label}. Continue praticando!`,
        variant: "destructive"
      });
    }

    setTimeout(() => {
      startNewRound();
    }, 2500);
  };

  const handleAnswer = (selectedOption: string) => {
    checkAnswer(selectedOption);
  };

  const handleTextSubmit = () => {
    if (userInput.trim()) {
      checkAnswer(userInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextSubmit();
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameRound(0);
    setPredictions([]);
    setOptions([]);
    setCurrentImage('');
    setGameStarted(false);
    setShowExplanation(true);
    setUserInput('');
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
            🧠 Jogo Educacional de Reconhecimento de Imagens
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Aprenda como as redes neurais reconhecem imagens! A IA vai analisar uma foto e você deve adivinhar o que ela identificou.
          </p>
        </div>

        {/* Explicação Educacional */}
        {showExplanation && !gameStarted && (
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Brain className="h-6 w-6" />
                Como Funciona a Inteligência Artificial?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <div className="space-y-3">
                <p>🔍 <strong>Reconhecimento de Imagens:</strong> A IA usa uma rede neural treinada com milhões de imagens</p>
                <p>🧠 <strong>Aprendizado:</strong> Ela aprendeu a identificar padrões, formas e características</p>
                <p>📊 <strong>Confiança:</strong> A IA dá uma porcentagem de certeza para cada identificação</p>
                <p>🎯 <strong>Seu Desafio:</strong> Digite ou clique no que a IA identificou na imagem!</p>
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
                Pronto para Aprender?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6 text-lg">
                Vamos descobrir como a inteligência artificial vê o mundo!
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
                <CardTitle className="text-xl">🖼️ Imagem para Análise</CardTitle>
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

            {/* Opções de Resposta */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">🤔 O que a IA identificou?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isProcessing ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
                    <p className="text-lg">A rede neural está processando...</p>
                  </div>
                ) : options.length > 0 ? (
                  <div className="space-y-4">
                    {/* Campo de Input para Digitação */}
                    <div className="border-2 border-dashed border-blue-300 p-4 rounded-lg bg-blue-50">
                      <p className="text-sm text-blue-700 mb-3 font-medium">✍️ Digite sua resposta:</p>
                      <div className="flex gap-2">
                        <Input
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Digite o que você acha que é..."
                          className="flex-1"
                          disabled={isProcessing}
                        />
                        <Button 
                          onClick={handleTextSubmit}
                          disabled={!userInput.trim() || isProcessing}
                          size="icon"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="text-center text-gray-500 text-sm">
                      - OU -
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">Clique em uma das opções:</p>
                      {options.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full text-left justify-start text-lg py-6 hover:bg-blue-50 transition-all duration-200 hover:scale-105"
                          onClick={() => handleAnswer(option)}
                          disabled={isProcessing}
                        >
                          {option}
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
              <CardTitle className="text-purple-800">🔬 Como a IA Analisou Esta Imagem</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700 mb-4">
                A rede neural deu estas pontuações de confiança:
              </p>
              <div className="space-y-3">
                {predictions.map((prediction, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      {index === 0 ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-gray-400" />}
                      <span className="font-medium">{prediction.label}</span>
                    </div>
                    <Badge variant={index === 0 ? "default" : "secondary"} className="text-lg">
                      {(prediction.score * 100).toFixed(1)}%
                    </Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-purple-600 mt-4">
                💡 A IA sempre escolhe a opção com maior porcentagem de confiança!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
