import React, { useState, useEffect } from 'react';
import { Brain, Eye, Layers, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GameHeader from './GameHeader';
import GameExplanation from './GameExplanation';
import GameScore from './GameScore';
import GameStart from './GameStart';
import EmojiDisplay from './EmojiDisplay';
import NeuralProcessing from './NeuralProcessing';
import ShapeClassification from './ShapeClassification';
import DetectedFeatures from './DetectedFeatures';
import ThemeToggle from './ThemeToggle';
import GameResults from './GameResults';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';

interface GameResult {
  label: string;
  score: number;
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

interface ShapeCategory {
  shape: 'circle' | 'rectangle' | 'triangle';
  name: string;
  description: string;
  keywords: string[];
  color: string;
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
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showPixelsCaptured, setShowPixelsCaptured] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [showIntroduction, setShowIntroduction] = useState(false);
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
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      shape: 'rectangle',
      name: 'Retângulo - Objetos Manufaturados',
      description: 'Representa objetos criados pelo homem com formas regulares e geométricas',
      keywords: ['bordas', 'tela', 'janelas', 'porta', 'metal', 'plástico'],
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      shape: 'triangle',
      name: 'Triângulo - Elementos Naturais',
      description: 'Representa elementos da natureza com formas irregulares e orgânicas',
      keywords: ['pico', 'tronco', 'galhos', 'pétalas', 'pedras', 'natural'],
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameFinished) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameFinished, startTime]);

  const startNewRound = async () => {
    setIsProcessing(true);
    setSelectedShape('');
    setCurrentStep('input');
    setShowPixelsCaptured(false);
    
    const randomEmoji = emojiItems[Math.floor(Math.random() * emojiItems.length)];
    setCurrentEmoji(randomEmoji);
    
    console.log('🔍 Iniciando análise de rede neural para:', randomEmoji.emoji);
    
    // Tempo para capturar pixels
    setTimeout(() => {
      setShowPixelsCaptured(true);
      
      setTimeout(() => {
        setCurrentStep('analysis');
        
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
        
        // Tempo mais longo para análise (10 segundos)
        setTimeout(() => {
          setCurrentStep('classification');
          
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
        }, 10000); // 10 segundos para análise
      }, 2000); // 2 segundos para mostrar pixels capturados
    }, 3000); // 3 segundos para capturar pixels
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
    setGameFinished(false);
    setTimeElapsed(0);
    setShowPixelsCaptured(false);
    setShowHero(true);
    setShowIntroduction(false);
  };

  const startIntroduction = () => {
    setShowHero(false);
    setShowIntroduction(true);
  };

  const startGame = () => {
    setShowHero(false);
    setShowIntroduction(false);
    setGameStarted(true);
    setShowExplanation(false);
    setStartTime(Date.now());
    startNewRound();
  };

  const finishGame = () => {
    setGameFinished(true);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  if (showHero) {
    return (
      <div>
        <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
        <InteractiveHero 
          onStartIntroduction={startIntroduction}
          isDarkTheme={isDarkTheme}
        />
      </div>
    );
  }

  if (showIntroduction) {
    return (
      <div>
        <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
        <ProjectIntroduction 
          onStartGame={startGame}
          isDarkTheme={isDarkTheme}
        />
      </div>
    );
  }

  if (gameFinished) {
    return (
      <div className={`min-h-screen p-4 ${
        isDarkTheme 
          ? 'bg-gradient-to-br from-black via-yellow-900 to-orange-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
          <GameResults 
            score={score}
            gameRound={gameRound}
            timeElapsed={timeElapsed}
            onRestart={resetGame}
            isDarkTheme={isDarkTheme}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 ${
      isDarkTheme 
        ? 'bg-gradient-to-br from-black via-yellow-900 to-orange-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="max-w-6xl mx-auto">
        <ThemeToggle isDarkTheme={isDarkTheme} onToggle={toggleTheme} />
        <GameHeader />

        {showExplanation && !gameStarted && <GameExplanation />}

        <GameScore score={score} gameRound={gameRound} gameStarted={gameStarted} />

        {!gameStarted ? (
          <GameStart onStartGame={startGame} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <EmojiDisplay 
              currentEmoji={currentEmoji} 
              isDarkTheme={isDarkTheme}
              showPixelsCaptured={showPixelsCaptured}
            />
            <NeuralProcessing 
              currentStep={currentStep}
              networkLayers={networkLayers}
              predictions={predictions}
              isDarkTheme={isDarkTheme}
            />
            <ShapeClassification 
              currentStep={currentStep}
              selectedShape={selectedShape}
              onShapeSelection={handleShapeSelection}
              onResetGame={resetGame}
              onFinishGame={finishGame}
              isDarkTheme={isDarkTheme}
            />
          </div>
        )}

        {currentEmoji && currentStep === 'classification' && (
          <DetectedFeatures 
            currentEmoji={currentEmoji}
            correctShape={correctShape}
            currentStep={currentStep}
          />
        )}
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
