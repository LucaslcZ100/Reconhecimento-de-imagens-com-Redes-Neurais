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
import GameResults from './GameResults';
import InteractiveHero from './InteractiveHero';
import ProjectIntroduction from './ProjectIntroduction';
import AnalysisCompletedDialog from './AnalysisCompletedDialog';

interface GameResult {
  label: string;
  score: number;
}

interface EmojiItem {
  emoji: string;
  name: string;
  category: 'circle' | 'rectangle' | 'triangle';
  features: string[];
  imageUrl: string;
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
  const [gameFinished, setGameFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showPixelsCaptured, setShowPixelsCaptured] = useState(false);
  const [showHero, setShowHero] = useState(true);
  const [showIntroduction, setShowIntroduction] = useState(false);
  const [showAnalysisDialog, setShowAnalysisDialog] = useState(false);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const { toast } = useToast();

  // Imagens reais organizadas por categoria geométrica - CORRIGIDAS
  const emojiItems: EmojiItem[] = [
    // Círculo - APENAS Seres Vivos (organismos com vida)
    { 
      emoji: '🐱', 
      name: 'gato', 
      category: 'circle', 
      features: ['olhos redondos', 'focinho arredondado', 'orelhas triangulares', 'pelagem macia'],
      imageUrl: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop'
    },
    { 
      emoji: '👤', 
      name: 'pessoa', 
      category: 'circle', 
      features: ['rosto oval', 'olhos', 'cabelo', 'expressão humana'],
      imageUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌸', 
      name: 'flor', 
      category: 'circle', 
      features: ['pétalas circulares', 'centro redondo', 'cores vibrantes', 'forma orgânica'],
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🍎', 
      name: 'fruta vermelha', 
      category: 'circle', 
      features: ['cor vermelha', 'formato arredondado', 'textura lisa', 'orgânico'],
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐄', 
      name: 'animal pastando', 
      category: 'circle', 
      features: ['corpo robusto', 'cabeça grande', 'manchas naturais', 'pernas fortes'],
      imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🦌', 
      name: 'veado', 
      category: 'circle', 
      features: ['corpo esbelto', 'chifres ramificados', 'pelagem marrom', 'olhos grandes'],
      imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐻', 
      name: 'animal selvagem', 
      category: 'circle', 
      features: ['pelagem densa', 'corpo robusto', 'orelhas arredondadas', 'focinho proeminente'],
      imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌳', 
      name: 'árvore', 
      category: 'circle', 
      features: ['tronco vertical', 'galhos ramificados', 'folhas verdes', 'organismo vivo'],
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐒', 
      name: 'primata', 
      category: 'circle', 
      features: ['postura dinâmica', 'membros alongados', 'comportamento ágil', 'mamífero'],
      imageUrl: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🦏', 
      name: 'rinoceronte', 
      category: 'circle', 
      features: ['silhueta imponente', 'chifre proeminente', 'pele rugosa', 'mamífero herbívoro'],
      imageUrl: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=400&fit=crop'
    },

    // Retângulo - Objetos Manufaturados com formas geométricas regulares
    { 
      emoji: '💻', 
      name: 'computador', 
      category: 'rectangle', 
      features: ['tela retangular', 'bordas definidas', 'teclado linear', 'design moderno'],
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop'
    },
    { 
      emoji: '📱', 
      name: 'laptop', 
      category: 'rectangle', 
      features: ['formato retangular', 'tela plana', 'bordas retas', 'material metálico'],
      imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🖥️', 
      name: 'monitor', 
      category: 'rectangle', 
      features: ['tela grande', 'suporte central', 'formato retangular', 'tecnologia digital'],
      imageUrl: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=400&h=400&fit=crop'
    },
    { 
      emoji: '💼', 
      name: 'mesa de trabalho', 
      category: 'rectangle', 
      features: ['superfície plana', 'bordas retas', 'material uniforme', 'design funcional'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏢', 
      name: 'edifício', 
      category: 'rectangle', 
      features: ['estrutura vertical', 'janelas alinhadas', 'fachada geométrica', 'arquitetura moderna'],
      imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏛️', 
      name: 'prédio branco', 
      category: 'rectangle', 
      features: ['paredes lisas', 'estrutura simétrica', 'linhas retas', 'design minimalista'],
      imageUrl: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏗️', 
      name: 'arranha-céu', 
      category: 'rectangle', 
      features: ['altura imponente', 'fachada repetitiva', 'geometria vertical', 'estrutura urbana'],
      imageUrl: 'https://images.unsplash.com/photo-1433832597046-4f10e10ac764?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌃', 
      name: 'construção urbana', 
      category: 'rectangle', 
      features: ['ângulos retos', 'superfícies planas', 'simetria arquitetônica', 'design contemporâneo'],
      imageUrl: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏬', 
      name: 'fachada moderna', 
      category: 'rectangle', 
      features: ['linhas horizontais', 'padrão repetitivo', 'estrutura geométrica', 'arquitetura clean'],
      imageUrl: 'https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏭', 
      name: 'complexo arquitetônico', 
      category: 'rectangle', 
      features: ['volumes retangulares', 'composição modular', 'formas angulares', 'design industrial'],
      imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=400&fit=crop'
    },

    // Triângulo - Elementos Naturais NÃO VIVOS (paisagens, fenômenos, objetos astronômicos)
    { 
      emoji: '🏔️', 
      name: 'montanha', 
      category: 'triangle', 
      features: ['pico pontiagudo', 'encosta íngreme', 'formação rochosa', 'altitude elevada'],
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop'
    },
    { 
      emoji: '⛰️', 
      name: 'paisagem montanhosa', 
      category: 'triangle', 
      features: ['várias elevações', 'terreno acidentado', 'formação natural', 'vista panorâmica'],
      imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌲', 
      name: 'floresta densa', 
      category: 'triangle', 
      features: ['vegetação densa', 'relevo irregular', 'tons de verde', 'paisagem natural'],
      imageUrl: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🏞️', 
      name: 'formação rochosa', 
      category: 'triangle', 
      features: ['picos rochosos', 'erosão natural', 'texturas irregulares', 'paisagem dramática'],
      imageUrl: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌕', 
      name: 'lua', 
      category: 'triangle', 
      features: ['forma circular', 'crateras', 'brilho uniforme', 'objeto celeste'],
      imageUrl: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🌊', 
      name: 'onda do mar', 
      category: 'triangle', 
      features: ['movimento fluido', 'curvas naturais', 'espuma branca', 'fenômeno natural'],
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🔵', 
      name: 'bolha de água', 
      category: 'triangle', 
      features: ['transparência', 'reflexos', 'forma esférica', 'fenômeno físico'],
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🦌', 
      name: 'paisagem natural', 
      category: 'triangle', 
      features: ['ambiente selvagem', 'elementos naturais', 'paisagem rural', 'cenário natural'],
      imageUrl: 'https://images.unsplash.com/photo-1439886183900-e79ec0057170?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🐮', 
      name: 'campo pastoral', 
      category: 'triangle', 
      features: ['ambiente pastoril', 'paisagem campestre', 'natureza rural', 'cenário bucólico'],
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop'
    },
    { 
      emoji: '🦓', 
      name: 'savana africana', 
      category: 'triangle', 
      features: ['paisagem selvagem', 'ambiente natural', 'ecossistema', 'habitat natural'],
      imageUrl: 'https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=400&fit=crop'
    }
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
    
    console.log('🔍 Iniciando análise de rede neural para:', randomEmoji.name);
    
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
    setIsCorrectAnswer(isCorrect);
    setShowAnalysisResult(true);
    
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

    // Mostrar modal após 3 segundos
    setTimeout(() => {
      setShowAnalysisDialog(true);
      setShowAnalysisResult(false);
    }, 3000);
  };

  const handleNewAnalysis = () => {
    setShowAnalysisDialog(false);
    startNewRound();
  };

  const handleEndSimulation = () => {
    setShowAnalysisDialog(false);
    finishGame();
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

  if (showHero) {
    return <InteractiveHero onStartIntroduction={startIntroduction} />;
  }

  if (showIntroduction) {
    return <ProjectIntroduction onStartGame={startGame} />;
  }

  if (gameFinished) {
    return (
      <GameResults 
        score={score}
        gameRound={gameRound}
        timeElapsed={timeElapsed}
        onRestart={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-black via-yellow-900 to-orange-900">
      <div className="max-w-6xl mx-auto">
        <GameHeader />

        {showExplanation && !gameStarted && <GameExplanation />}

        <GameScore score={score} gameRound={gameRound} gameStarted={gameStarted} />

        {!gameStarted ? (
          <GameStart onStartGame={startGame} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <EmojiDisplay 
              currentEmoji={currentEmoji} 
              showPixelsCaptured={showPixelsCaptured}
              isDarkTheme={true}
            />
            <NeuralProcessing 
              currentStep={currentStep}
              networkLayers={networkLayers}
              predictions={predictions}
              isDarkTheme={true}
            />
            <ShapeClassification 
              currentStep={currentStep}
              selectedShape={selectedShape}
              onShapeSelection={handleShapeSelection}
              onResetGame={resetGame}
              onFinishGame={finishGame}
              isDarkTheme={true}
            />
          </div>
        )}

        {/* Resultado da Análise - Barra colorida no topo */}
        {showAnalysisResult && selectedShape && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg border-2 transition-all duration-500 ${
            isCorrectAnswer 
              ? 'bg-green-100 border-green-500 text-green-800' 
              : 'bg-red-100 border-red-500 text-red-800'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {isCorrectAnswer ? '✅' : '❌'}
              </span>
              <span className="font-semibold">
                {isCorrectAnswer ? 'Correto!' : 'Incorreto!'}
              </span>
              <span className="text-sm">
                {isCorrectAnswer 
                  ? `A IA classificou "${currentEmoji?.name}" corretamente.`
                  : `A resposta correta era ${shapeCategories.find(cat => cat.shape === correctShape)?.name}.`
                }
              </span>
            </div>
          </div>
        )}

        {currentEmoji && currentStep === 'classification' && (
          <DetectedFeatures 
            currentEmoji={currentEmoji}
            correctShape={correctShape}
            currentStep={currentStep}
          />
        )}

        <AnalysisCompletedDialog
          isOpen={showAnalysisDialog}
          onNewAnalysis={handleNewAnalysis}
          onEndSimulation={handleEndSimulation}
          currentScore={score}
          currentRound={gameRound}
        />
      </div>
    </div>
  );
};

export default ImageRecognitionGame;
